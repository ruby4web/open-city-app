import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Picker,
} from 'react-native';

import ModalPicker  from 'react-native-modal-picker';
import transGeneral from '../translations/general';

// Returns a native picker for Android or native popup with selection for iOS
class NativePicker extends Component {

  constructor(props, context) {
    super(props);

    transGeneral.setLanguage('fi');
  }

  itemChange(item) {
    this.props.itemChange(item);
  }

  render() {
    var picker = <ModalPicker
                  style={styles.modalPicker}
                  data={this.props.data}
                  initValue={this.props.selectedItem}
                  cancelText={transGeneral.cancel}
                  onChange={(item)=>this.itemChange(item)} />;

    if (Platform.OS === 'android') {
      picker = <Picker
                selectedValue={this.props.selectedItem}
                onValueChange={(item)=>this.itemChange(item)}>
                {this.props.data.map((item) => (
                  <Picker.Item label={item.label} value={item.key} key={item.key} />
                ))}
              </Picker>;
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {picker}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalPicker: {
    borderWidth: 0,
    alignItems: 'flex-start'
  },
});

module.exports = NativePicker
