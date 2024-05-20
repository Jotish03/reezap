import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useState, useRef } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

interface OTPInputProps {
  onCodeFilled: (code: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onCodeFilled }) => {
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const navigation = useNavigation<NavigationProp<any>>();
  const [isVerifying, setIsVerifying] = useState(false);
  const confirmationResultRef =
    useRef<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const handleOTPChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    try {
      if (otp.every((digit) => digit.length === 1)) {
        const otpCode = otp.join("");
        onCodeFilled(otpCode);

        const userCredential = await confirmationResultRef.current?.confirm(
          otpCode
        );
        const user = userCredential?.user;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View>
      <View className="flex flex-col items-center justify-center mt-16">
        <Text className="font-intersemibold text-xl">OTP</Text>
        <Text className="font-interregular">Waiting for OTP</Text>
      </View>
      <View className="flex flex-row justify-center items-center space-x-2 my-4">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-bold"
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => handleOTPChange(index, value)}
          />
        ))}
      </View>
      <TouchableOpacity
        className="bg-primary py-3 px-6 rounded-lg mt-1"
        onPress={handleVerifyOTP}
        disabled={isVerifying}
      >
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-white text-center font-intersemibold">
            {isVerifying ? "Verifying" : "Verify OTP"}
          </Text>
          {isVerifying && <ActivityIndicator color={"#ffffff"} />}
        </View>
      </TouchableOpacity>
      <Text className="font-interregular text-gray-500 text-[12px] mt-2 text-center">
        Resend OTP
      </Text>
    </View>
  );
};

export default OTPInput;
