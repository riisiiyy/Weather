import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import axios from "axios";

interface WeatherData {
  name: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const Weather = () => {
  const [city, setCity] = useState("Iligan City");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d862b4b7a910dbfe9ca8dca553055bd0`
      );
      setWeatherData(response.data);
    } catch (error) {
      Alert.alert("Error", "City not found. Please enter a valid city name.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (text: string) => {
    setCity(text);
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpapers.com/images/hd/moon-on-dark-purple-night-sky-smemen4xh5cvbzf3.jpg" }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={handleInputChange}
          style={styles.input}
        />
        <Button title="Get Weather" onPress={handleSubmit} color="#3498db" />

        {weatherData ? (
          <ScrollView style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.city}>{weatherData.name}</Text>
              <Text style={styles.date}>
                {new Date(weatherData.dt * 1000).toLocaleDateString("en-IN")}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                }}
                style={styles.weatherIcon}
              />
              <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailText}>Feels Like: {weatherData.main.feels_like}°C</Text>
              <Text style={styles.detailText}>Wind: {weatherData.wind.speed} m/s</Text>
              <Text style={styles.detailText}>Humidity: {weatherData.main.humidity}%</Text>
              <Text style={styles.detailText}>Air Pressure: {weatherData.main.pressure} hPa</Text>
              <Text style={styles.detailText}>
                Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
              </Text>
              <Text style={styles.detailText}>
                Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.loading}>Loading weather data...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(236, 240, 241, 0.0)", 
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: 600, 
    margin: "auto",
  },
  title: {
    fontSize: width > 600 ? 32 : 24, 
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    width: width > 600 ? "60%" : "80%", 
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "rgba(236, 240, 241, 0.3)",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: width > 600 ? "60%" : "90%", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoContainer: {
    alignItems: "center",
  },
  city: {
    fontSize: width > 600 ? 26 : 22, 
    fontWeight: "bold",
    color: "#000000",
  },
  date: {
    fontSize: width > 600 ? 18 : 16,
    color: "#000000",
    marginBottom: 10,
  },
  weatherIcon: {
    width: width > 600 ? 100 : 80, 
    height: width > 600 ? 100 : 80,
  },
  temperature: {
    fontSize: width > 600 ? 36 : 30, 
    fontWeight: "bold",
    color: "#ffcc00",
  },
  description: {
    fontSize: width > 600 ? 20 : 18,
    fontStyle: "italic",
    color: "#000000",
  },
  details: {
    marginTop: 15,
  },
  detailText: {
    fontSize: width > 600 ? 18 : 16, 
    color: "#000000",
    marginBottom: 5,
  },
  loading: {
    fontSize: width > 600 ? 18 : 16,
    color: "#000000",
    marginTop: 20,
  },
});

export default Weather;
