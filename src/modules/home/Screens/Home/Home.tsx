import React, {useEffect, useState} from 'react';
import { 
View,
Text,
StyleSheet,
SafeAreaView,
TouchableOpacity,
Modal,
FlatList,
} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../../common/navigation/Routes';
import {Theme} from '../../../../common/providers/ThemeProvider';
import useThemedStyles from '../../../../common/hooks/useThemedStyles';
import useTheme from '../../../../common/hooks/useTheme';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

import { SFSymbol } from "react-native-sfsymbols";

const audioRecorderPlayer = new AudioRecorderPlayer();

const HomeScreen = () => {
  const navigation = useNavigation();
  const style = useThemedStyles(styles);
  const theme = useTheme();

  const [essays, setEssays] = useState([]);
  const [selectedEssay, setSelectedEssay] = useState(null);

  const [sentences, setSentences] = useState([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const [transcript, setTranscript] = useState([]);

  const [isEssayListVisible, setIsEssayListVisible] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  
  const [isLoading, setIsLoading] = useState(null);
  
  useBackHandler(() => {
    return true;
  });

  useEffect(() => {
    const loadEssays = () => {
      RNFS.readDir(RNFS.MainBundlePath)
      .then((result) => {
        // Filter to get only .es files
        const essayFiles = result.filter(file => file.name.endsWith('.es.txt'));
        // Map to remove .es extension
        const essayNames = essayFiles.map(file => {
          let id = file.name.slice(0, 3)
          
          let name = file.name.slice(4).replace('.es.txt', '').replaceAll('_', ' ')
          name = name.charAt(0).toUpperCase() + name.slice(1)
          
          let path = file.path.split('/').slice(0, -1).join('/') + '/'
          let filename = file.path.split('/').slice(-1)[0]

          return { id, name, path, filename}
        });
        // Update state with essay names
        setEssays(essayNames);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
    }
    loadEssays();
  }, []);

  useEffect(() => {
    const loadSentences = async () => {
      if (!selectedEssay) return;

      let sentences = await RNFS.readFile(selectedEssay.path + selectedEssay.filename, 'utf8');
      sentences = sentences.split('\n')

      let transcript = await RNFS.readFile(selectedEssay.path + selectedEssay.id + ".json", 'utf8');
      transcript = transcript.split('\n') 

      setSentenceIndex(0);
      setSentences(sentences)

      setTranscript(transcript)

      setIsEssayListVisible(false);
    }
    loadSentences();
  }, [selectedEssay])

  const onShowEssayList = () => {
    setIsEssayListVisible(true);
  }

  const onWord = async (word) => {
    // Remove all punctuation from the word
    let normalized_word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    // Search for a match
    const match = JSON.parse(transcript[sentenceIndex]).find(obj => obj.label === normalized_word.toUpperCase());

    onPlay(start_t = match.start-100, end_t = match.end-100);
  }

  const onPlay = async (start_t = 0, end_t = null) => {
    if (isRecording || isPlayingRecording) return;
    await audioRecorderPlayer.startPlayer(
      `file://${selectedEssay.path}${selectedEssay.id}_${sentenceIndex+1}.mp3`
    );
    await audioRecorderPlayer.seekToPlayer(start_t)
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition == e.duration) onStop();
      if (end_t && e.currentPosition > end_t) onStop();
    });
    setIsPlaying(true)
  }

  const onStop = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false)
  }

  const onStartRecord = async () => {
    if (isPlaying || isPlayingRecording) return;
    await audioRecorderPlayer.startRecorder("recording.m4a");
    setIsRecording(true)
  }

  const onStopRecord = async () => {
    const mess = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false)
  }

  const onPlayRecording = async () => {
    if (isPlaying || isRecording) return;
    await audioRecorderPlayer.startPlayer(
      "recording.m4a"
    );
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition == e.duration) onStopPlayingRecording();
    });
    setIsPlayingRecording(true)
  }

  const onStopPlayingRecording = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlayingRecording(false);
  }

  const onNext = () => {
    setSentenceIndex(prevState => {
      return prevState + 1 >= sentences.length ? prevState : prevState + 1
    })
  }

  const onPrevious = () => {
    setSentenceIndex(prevState => {
      return prevState <= 0 ? prevState : prevState - 1
    })
  }

  const sentence = sentences[sentenceIndex];

  return (
    <SafeAreaView style={style.root}>
      <View style={style.container}>
        <View style={{paddingLeft: theme.spacing.PADDING_SIZE_4}} />
        <TouchableOpacity style={style.button} onPress={onShowEssayList}>
          <View>
            <SFSymbol
              name="list.bullet"
              weight="semibold"
              scale="large"
              color="#0B84FF"
              size={18}
              resizeMode="center"
              multicolor={false}
              style={{ width: 32, height: 32 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{paddingLeft: theme.spacing.PADDING_SIZE_8}} />
        <View>
          <Text style={style.label2}>
            {selectedEssay?.name || 'No Essay Selected'}
          </Text>
        </View>
      </View>
      <View style={{flex: 1}} />
      <View style={style.container2}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          {sentence ? sentence.split(' ').map((word, index) => (
            <TouchableOpacity key={index} onPress={() => {onWord(word)}}>
              <Text style={style.label}>
                {word}
                {index < sentence.split(' ').length - 1 && ' '}
              </Text>
            </TouchableOpacity>
          )) : <Text style={style.label}>No Essay Selected</Text>}
        </View>
        <View style={style.container}>
          <TouchableOpacity style={style.button2} onPress={isPlaying ? onStop : () => {onPlay(0, null)}}>
            <View>
              {
                isPlaying ? (
                  <SFSymbol
                    name="stop.fill"
                    weight="semibold"
                    scale="large"
                    color="#0B84FF"
                    size={18}
                    resizeMode="center"
                    multicolor={false}
                    style={{ width: 32, height: 32 }}
                  />
                ) : (
                  <SFSymbol
                    name="play.fill"
                    weight="semibold"
                    scale="large"
                    color="#0B84FF"
                    size={18}
                    resizeMode="center"
                    multicolor={false}
                    style={{ width: 32, height: 32 }}
                  />
                )
              }
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.button2} disabled={true}>
            <View>
              <SFSymbol
                name="bookmark"
                weight="semibold"
                scale="large"
                color="#808080"
                size={18}
                resizeMode="center"
                multicolor={false}
                style={{ width: 32, height: 32 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.button2} onPress={isPlayingRecording ? onStopPlayingRecording : onPlayRecording}>
            <View>
              <SFSymbol
                name="person"
                weight="semibold"
                scale="large"
                color="#0B84FF"
                size={18}
                resizeMode="center"
                multicolor={false}
                style={{ width: 32, height: 32 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.button2} onPress={isRecording ? onStopRecord : onStartRecord}>
            <View>
              {
                isRecording ? (
                  <SFSymbol
                    name="stop.circle"
                    weight="semibold"
                    scale="large"
                    color="#FF453A"
                    size={18}
                    resizeMode="center"
                    multicolor={false}
                    style={{ width: 32, height: 32 }}
                  />
                ) : (
                  <SFSymbol
                    name="record.circle"
                    weight="semibold"
                    scale="large"
                    color="#0B84FF"
                    size={18}
                    resizeMode="center"
                    multicolor={false}
                    style={{ width: 32, height: 32 }}
                  />
                )
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}} />
      <View style={{...style.container, margin: theme.spacing.PADDING_SIZE_12}}>
        <TouchableOpacity onPress={onPrevious} disabled={sentenceIndex <= 0}>
          <View>
            <Text style={{...style.label, color: sentenceIndex <= 0 ? "#808080" : "#0B84FF"}}>Previous</Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View>
          <Text style={style.label}>
            {sentenceIndex+1 + '/' + sentences.length}
          </Text>
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={onNext} disabled={sentenceIndex + 1 >= sentences.length}>
          <View>
            <Text style={{...style.label, color: sentenceIndex + 1 >= sentences.length ? "#808080" : "#0B84FF"}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        <Modal
          visible={isEssayListVisible}
          animationType="slide"
          onDismiss={() => {setIsEssayListVisible(false)}}
          onRequestClose={() => {setIsEssayListVisible(false)}}
          presentationStyle={"pageSheet"}>
          <View style={{...style.root, backgroundColor: '#1C1C1E'}}>
            <View style={{paddingTop: theme.spacing.PADDING_SIZE_32}} />
            <View>
              <View>
                <Text style={style.title}>Essays</Text>
              </View>
              <View>
                <FlatList
                  ItemSeparatorComponent={
                    ({highlighted}) => (
                      <View
                        style={{height: 1, backgroundColor: '#424242'}}
                      />
                    )
                  }
                  data={essays}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {setSelectedEssay(item)}}
                      >
                      <View>
                        <Text style={{color: "#0B84FF", fontSize: 17, paddingVertical: 12}}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  style={{backgroundColor: '#2C2C2E', paddingHorizontal: 20, paddingVertical: 2, borderRadius: 10, marginHorizontal: 20}}
                />
              </View>
            </View>
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors_ds.NEUTRAL_GENERAL_BLACK
    },
    
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    container2: {
      alignItems: 'center',
    },

    label: {
      color: theme.colors_ds.NEUTRAL_TEXT_LIGHT,
      fontSize: theme.spacing.FONT_SIZE_24
    },
    label2: {
      color: theme.colors_ds.NEUTRAL_TEXT_LIGHT,
      fontSize: theme.spacing.FONT_SIZE_22
    },

    button: {
      margin: theme.spacing.PADDING_SIZE_8
    },
    button2: {
      margin: theme.spacing.PADDING_SIZE_16,
    },

    title: {
      color: theme.colors_ds.NEUTRAL_TEXT_LIGHT,

      fontSize: 38,
      fontWeight: '700',

      margin: theme.spacing.PADDING_SIZE_20
    }
    
})};

export default HomeScreen;
