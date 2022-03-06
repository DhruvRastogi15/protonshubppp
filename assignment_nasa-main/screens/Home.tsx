import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Headline, ActivityIndicator } from "react-native-paper";

const baseUrl = "https://api.nasa.gov/neo/rest/v1/";
const api_key = "kR7NauroIxGAU1NAeQHwrwffGwL2JHaMyJFHUie6";
const browse = "browse";
const neo = "neo/";

type MyProps = {
  route: any;
  navigation: any;
};

type MyState = {
  asetroidId: any;
  object: {
    name: string;
    nasa_jpl_url: any;
    potential_aestroidId: any;
    id: any;
  };
  random_Ids: any;
  isLoading: boolean;
  loading: boolean;
};

export default class Home extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      asetroidId: "",
      loading: false,
      isLoading: false,
      object: {
        name: "",
        nasa_jpl_url: "",
        potential_aestroidId: "",
        id: "",
      },
      random_Ids: [],
    };
  }

  handleAsteroidId = (value: any) => {
    this.setState({ asetroidId: value });
  };

  callApiUsingRandomId = async () => {
    const randomId = await this.state.random_Ids[
      Math.floor(Math.random() * this.state.random_Ids.length)
    ];
    if (randomId) {
      fetch(baseUrl + neo + randomId.id + `?api_key=${api_key}`)
        .then((response) => response.json())
        .then((json) => {
          this.setState(
            {
              object: {
                name: json.name,
                id: json.id,
                nasa_jpl_url: json.nasa_jpl_url,
                potential_aestroidId: json.is_potentially_hazardous_asteroid,
              },
              loading: false,
            },
            () => {
              this.props.navigation.navigate("Detail", {
                data: this.state.object,
              });
            }
          );
          console.log(`object`, json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  
  getRandomAsteroidIds = () => {
    this.setState({ loading: true });
    fetch(baseUrl + neo + browse + `?api_key=${api_key}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(`random id>>>>>>>>>>>>.`, json);
        this.setState({ random_Ids: json.near_earth_objects }, () => {
          this.callApiUsingRandomId();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  getAsteroidIds = () => {
    if (this.state.asetroidId.length == 7) {
      this.setState({ isLoading: true });
      fetch(baseUrl + neo + this.state.asetroidId + `?api_key=${api_key}`)
        .then((response) => response.json())
        .then((json) => {
          if (json != null) {
            this.setState(
              {
                object: {
                  id: json?.id,
                  name: json?.name,
                  nasa_jpl_url: json?.nasa_jpl_url,
                  potential_aestroidId: json?.is_potentially_hazardous_asteroid,
                },
                isLoading: false,
                asetroidId: "",
              },
              () => {
                this.props.navigation.navigate("Detail", {
                  data: this.state.object,
                });
              }
            );
            console.log(`object`, json);
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false, asetroidId: "" });
          console.error(error);
          alert("Please enter valid aestroid id");
        });
    } else {
      alert("Please enter valid aestroid id");
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Headline style={{ textAlign: "center" }}>
          Get Asteroid Details
        </Headline>
        <TextInput
          style={styles.input}
          onChangeText={(value) => this.handleAsteroidId(value)}
          value={this.state.asetroidId}
          placeholder="Enter Asteroid ID"
          keyboardType="numeric"
          maxLength={7}
        />
        <View>
          {this.state.isLoading ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Button
              mode="contained"
              onPress={() => this.getAsteroidIds()}
              disabled={this.state.asetroidId == "" ? true : false}
            >
              Submit
            </Button>
          )}
        </View>
        <View>
          {this.state.loading ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Button
              mode="contained"
              onPress={() => this.getRandomAsteroidIds()}
            >
              {" "}
              Random Asteroid
            </Button>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    padding: 10,
    width: 300,
  },
});
