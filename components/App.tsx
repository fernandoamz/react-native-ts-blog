import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {incrementCount, decrementCount} from '../actions/incrementer';

function App(props: any) {
  return (
    <View style={styles.containerView}>
      <Text>{props.counter.counter}</Text>
      <Button
        title="Increment"
        onPress={() => props.increment(props.counter.counter)}
      />
      <Button
        title="Decrement"
        onPress={() => props.decrement(props.counter.counter)}
      />
    </View>
  );
}

const mapStateProps = (state: any) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (counter: number) => {
      dispatch(incrementCount(counter));
    },

    decrement: (counter: number) => {
      dispatch(decrementCount(counter));
    },
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
