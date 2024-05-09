import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import QuillEditor, {QuillToolbar} from 'react-native-cn-quill';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {BigBlueButtonTablet} from 'bigbluebutton-tablet-sdk';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const [loadComponent, setLoadComponent] = React.useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [textContent, setTextContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  // console.log('--', value);
  // const handleOnError = React.useCallback((content: any) => {
  //   const nativeEvent = content.nativeEvent as INativeEvent;
  //   console.log(
  //     `Error loading URL ${nativeEvent.url}: ${nativeEvent.description}`,
  //   );
  //   setLoadComponent(false);
  //   Alert.alert('Error loading URL', undefined, [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Retry',
  //       onPress: () => {
  //         console.log('Retry Pressed');
  //         setLoadComponent(true);
  //       },
  //     },
  //   ]);
  // }, []);
  const _editor = useRef<QuillEditor | null>(null);
  const customStyles = {
    toolbar: {
      provider: (provided: any) => ({
        ...provided,
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderColor: 'white',
      }),
      root: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
      }),
    },
  };
  const changes = () => {
    _editor.current
      ?.getText()
      .then((text: string) => {
        setTextContent(text);
        console.log('*******', text);
      })
      .catch((error: any) => {
        console.error('Error getting text:', error);
      });
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* <Screen1 /> */}
        {/* <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Text>Open</Text>
        </TouchableOpacity> */}
        {/* {visible && ( */}
        {visible ? (
          // <WebView
          //   source={{
          //     uri: value,
          //   }}
          //   style={{flex: 1}}
          //   contentMode={'mobile'}
          //   mediaPlaybackRequiresUserAction={false}
          //   geolocationEnabled={true}
          //   mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
          //   allowsInlineMediaPlayback={true}
          //   javaScriptEnabled={true}
          //   domStorageEnabled
          //   onMessage={(msg: any) => console.log('===', msg)}
          // />
          <BigBlueButtonTablet
            url={value}
            style={styles.bbb}
            onError={(content: any) => console.log(content)}
            onSuccess={() => console.log('URL Valid')}
          />
        ) : (
          <>
            <TextInput
              value={value}
              onChangeText={item => setValue(item)}
              style={styles.grey}
            />
            <TouchableOpacity
              onPress={() => {
                if (value !== '') {
                  setVisible(true);
                }
              }}
              style={styles.btn}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </>
        )}
        {/* <View style={styles.edit}>
          <QuillEditor
            onTextChange={() => changes()}
            onHtmlChange={({html}) => console.log('+++', html)}
            onEditorChange={({args}) => console.log('==', args)}
            style={styles.editor}
            ref={_editor}
            // quill={{
            //   modules:
            // }}
            initialHtml=""
          />
          <QuillToolbar
            styles={customStyles}
            editor={_editor}
            options={[
              ['bold', 'italic', 'underline', 'strike'],
              [{header: 1}, {header: 2}],
              [{align: []}],
            ]}
            theme="light"
          />
        </View> */}
        {/* <Text style={styles.title}>{textContent}</Text> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {flex: 1, backgroundColor: 'white'},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  grey: {
    backgroundColor: '#f5f5f5',
    color: 'black',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
  bbb: {
    flex: 1,
  },
  btn: {
    height: 30,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
    marginTop: 30,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  edit: {
    height: 300,
  },
});

export default App;
