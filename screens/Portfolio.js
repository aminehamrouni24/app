import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image ,Alert} from "react-native";
import { connect } from "react-redux";
import MainLayout from "./MainLayout";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldings } from "../stores/market/MarketAction";
import { BalanceInfo, Chart, IconTextButton } from "../components";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";
import NfcManager, { NfcTech, NfcEvents } from "react-native-nfc-manager";
import LinearGradient from "react-native-linear-gradient";

// Nfc Part

function buildUrlPayload(valueToWrite) {
  return Ndef.encodeMessage([
      Ndef.uriRecord(valueToWrite),
  ]);
}


const Portfolio = (props) => {
  const [hasNfc, setHasNfc] = useState(null);
  useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
      }
      setHasNfc(supported);
    }
    checkNfc();
  }, []);

  // :nfc part 2
  async function scanTag() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn("Tag found", tag);
    });
   
   
  }

  //
  // if (hasNfc === null) {
  //   return null;
  // } else {
  //   if (!hasNfc) {
  //     return (
  //       <View>
  //         <TouchableOpacity  onPress={() => scanTag}>
  //           <Text>Your device doesn't support NFC</Text></TouchableOpacity>
  //       </View>
  //     );
  //   }
  // }
  // 
  useEffect(()=>{
    NfcManager.start();

  })
  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }
  
  _testNdef = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to read some NFC tags!'
      });
      console.warn(resp);
      let ndef = await NfcManager.scanTag();
      console.warn('successfully scan ndef');
      await NfcManager.setAlertMessage('I got your tag!');
      this._cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      this._cleanUp();
    }
  }

  _readNdef = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to read some NFC tags!'
      });
      console.warn(resp);
      let ndef = await NfcManager.getNdefMessage();
      console.warn(ndef);
      let bytes = buildUrlPayload('https://www.revteltech.com');
      await NfcManager.readNdefMessage(bytes);
      console.warn('successfully write ndef');
      await NfcManager.setAlertMessage('I got your tag!');
      this._cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      this._cleanUp();
    }
  }

  const { getHoldings, myHoldings } = props;

  const [selectedCoin, setSelectedCoin] = useState(null);
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, [])
  );

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          backgroundColor: "black",
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
            marginTop: 10,
            color: "white",
            ...FONTS.h1,
          }}
        >
          Portfolio
        </Text>
        <BalanceInfo
          // title="No Coin Detected"
          displayAmount="00.00"
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            // marginBottom: SIZES.padding,
            color: "#000",
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
            label="Add Coin"
            icon={icons.coin}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
              borderColor: "goldenrod",
              borderWidth: 1,
            }}
            onPress={() => _testNdef}
          />
        </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Current Balance */}
        {renderCurrentBalanceSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />
        {/* Your Assets */}

        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            color: "#000",
          }}
          ListHeaderComponent={
            <View>
              {/* section title */}
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                  paddingVertical: SIZES.radius,
                }}
              >
                Your Assset
              </Text>

              {/* header Label */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                  }}
                >
                  Asset
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                    textAlign: "right",
                    paddingLeft: 15,
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 55,
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* asset */}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: SIZES.radius,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${item.current_price.toLocaleString()}
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
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                {/* holdings */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${item.total.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty}
                    {item.symbol.toUpperCase()}
                  </Text>
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
    </MainLayout>
  );
};

// export default Portfolio;

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
