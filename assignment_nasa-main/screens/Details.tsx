import React, { Component } from "react";
import { StyleSheet, Linking, View } from "react-native";
import { Headline, List, Card } from "react-native-paper";

type MyProps = {
  route: any;
};

type MyState = {
  count: number;
};

export default class Details extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={{ height: 500, width: "100%" }}>
          <Card.Content>
            <Headline style={{ textAlign: "center" }}>Aestroid Detail</Headline>
            <View style={{ marginTop: 20 }}>
              <List.Item
                title="Id"
                description={this.props?.route?.params?.data?.id}
              />
              <List.Item
                title="Name"
                description={this.props?.route?.params?.data?.name}
              />
              <List.Item
                title="Is_potentially_hazardous_asteroid"
                description={
                  this.props?.route?.params?.data?.potential_aestroidId == true
                    ? "Yes"
                    : "No"
                }
              />
              <List.Item
                title="Nasa_jpl_url"
                description={this.props?.route?.params?.data?.nasa_jpl_url}
                onPress={() =>
                  Linking.openURL(this.props?.route?.params?.data?.nasa_jpl_url)
                }
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
