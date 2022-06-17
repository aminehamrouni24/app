import { View, Text } from "react-native";
import React from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import Portfolio from "./Portfolio";

const NfcTag = (props) => {
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
  if (hasNfc === null) {
    return null;
  } else {
    if (!hasNfc) {
      return (
        <View>
          <Text>Your device doesn't support NFC</Text>
        </View>
      );
    }
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Portfolio" component={Portfolio} />
    </Tab.Navigator>
  );
};

export default NfcTag;
