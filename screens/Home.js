import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { MainLayout } from "./";
import { Chart, IconTextButton, BalanceInfo } from "../components";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/MarketAction";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor:"black"
        }}
      >
      <LinearGradient
        colors={[ " rgb(200, 137, 84)",
          "rgb(240, 193, 149)",]}
        style={{
          
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          width:"100%",
         
     
        }}>
         <Text
          style={{
            marginTop: 20,
            color: "white",
            ...FONTS.h1,
          }}
        >
         Home
        </Text>
        <BalanceInfo
          // title="Your Wallet"
          displayAmount="00.00"
          changePct={percChange}
          containerStyle={{
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
              borderColor: "goldenrod",
              borderWidth: 1,
            }}
            onPress={() => console.log("transfer")}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
              borderColor: "goldenrod",
              borderWidth: 1,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
        </LinearGradient>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );

  return (
    <MainLayout>
      <LinearGradient
        colors={["#000", "#000"]}
        style={{
          height: "100%",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.black,
          }}
        >
          {/* wallet info */}
          {renderWalletInfoSection()}

          {/* charts */}
          <Chart
            containerStyle={{
              marginTop: SIZES.padding * 2,
            }}
            chartPrices={
              selectedCoin
                ? selectedCoin?.sparkline_in_7d?.price
                : coins[0]?.sparkline_in_7d?.price
            }
          />

          {/* Top CryptoCurrency */}
          <FlatList
            data={coins}
            keyExtractor={(item) => item.id}
            containerStyle={{
              marginTop: 30,
            }}
            ListHeaderComponent={
              <View style={{ marginBottom: SIZES.radius }}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    fontSize: 18,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding,
                  }}
                >
                  Top CryptoCurrency
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              let priceColor =
                item.price_change_percentage_7d_in_currency === 0
                  ? COLORS.lightGray3
                  : item.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;
              return (
                <TouchableOpacity
                  style={{
                    height: 55,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: SIZES.padding,
                  }}
                  onPress={() => setSelectedCoin(item)}
                >
                  {/* logo */}
                  <View
                    style={{
                      width: 35,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  </View>
                  {/* name */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h3,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>

                  {/* figures  */}
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        textAlign: "right",
                        ...FONTS.h4,
                      }}
                    >
                      ${item.current_price}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency != 0 && (
                        <Image
                          source={icons.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform:
                              item.price_change_percentage_7d_in_currency > 0
                                ? [{ rotate: "45deg" }]
                                : [{ rotate: "125deg" }],
                          }}
                        />
                      )}
                      <Text
                        style={{
                          marginLeft: 5,
                          color: priceColor,
                          ...FONTS.body5,
                          lineHeight: 15,
                        }}
                      >
                        {item.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: 50,
                }}
              />
            }
          />
        </View>
      </LinearGradient>
    </MainLayout>
  );
};

// export default Home;

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
