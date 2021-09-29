import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroMaterials,
  ViroAnimations,
} from '@viro-community/react-viro';
import Maison from './res/obj/maison/cottage.obj';
import Tree from './res/obj/tree/trees9.obj';
import GLTF from './res/sans-nomenclature.gltf';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  // const Maison = require('./res/obj/maison/cottage.obj');
  // const Voiture = require('../res/obj/mustang.obj');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -3]}
        style={styles.helloWorldTextStyle}
      />
      <Viro3DObject
        // source={require('./asset/obj/maison/')}
        source={Maison}
        position={[10, -4, -50]}
        scale={[0.5, 0.5, 0.5]}
        type="OBJ"
        materials={['house']}
      />
      <Viro3DObject
        // source={require('./asset/obj/maison/')}
        source={Tree}
        position={[-10, 4, -40]}
        scale={[0.5, 0.5, 0.5]}
        type="OBJ"
        materials={['tree']}
        animation={{name: 'animateImage', run: true}}
      />
      <Viro3DObject
        // source={require('./asset/obj/maison/')}
        source={GLTF}
        position={[-0.75, 0.0, -10.0]}
        scale={[1, 1, 1]}
        opacity={1.0}
        type="GLTF"
        onLoadStart={e => {
          console.log('OnloadStart', e);
        }}
        onLoadEnd={e => console.log('OnLoadEND', e)} // this. -> exist as function
        onError={e => console.log('Error', e)}
        materials={['tree']}
        // materials={['tree']}
        // animation={{name: 'animateImage', run: true}}
      />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {scaleX: 1.0, scaleY: 0.6, scaleZ: 1.0, opacity: 1.0},
    easing: 'Bounce',
    duration: 5000,
  },
});

ViroMaterials.createMaterials({
  house: {
    lightingModel: 'Constant',
    diffuseColor: '#088A08',
    diffuseColor: '#B40431',
  },
});

ViroMaterials.createMaterials({
  tree: {
    lightingModel: 'Constant',
    diffuseColor: '#01DF3A',
    diffuseColor: '#64FE2E',
  },
});

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
