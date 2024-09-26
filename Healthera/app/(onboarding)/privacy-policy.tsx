import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

const PrivacyPolicyScreen = () => {
  const theme = useColorScheme() ?? "dark";

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Privacy Policy" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mt-10" />
            <View className="w-[85%] gap-y-4">
              <ThemedText style={{ color: Colors[theme].accent }}>Last Updated: 25/09/2024</ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Privacy Policy
              </ThemedText>

              <ThemedText className="text-sm">
                This privacy policy applies to the Healthera app (hereby referred to as "Application") for mobile
                devices that was created by Healthera (hereby referred to as "Service Provider") as a Free service. This
                service is intended for use "AS IS".
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Information Collection and Use
              </ThemedText>
              <ThemedText className="text-sm">
                The Application collects information when you download and use it. This information may include
                information such as
              </ThemedText>

              <View style={{ paddingLeft: 20 }}>
                <ThemedText className="text-sm">• Your device's Internet Protocol address (e.g. IP address)</ThemedText>
                <ThemedText className="text-sm">
                  • The pages of the Application that you visit, the time and date of your visit, the time spent on
                  those pages
                </ThemedText>
                <ThemedText className="text-sm">• The time spent on the Application</ThemedText>
                <ThemedText className="text-sm">• The operating system you use on your mobile device</ThemedText>
              </View>

              <ThemedText className="text-sm">
                The Application does not gather precise information about the location of your mobile device.
              </ThemedText>
              <ThemedText className="text-sm">
                The Application collects your device's location, which helps the Service Provider determine your
                approximate geographical location and make use of in below ways:
              </ThemedText>

              <View style={{ paddingLeft: 20 }}>
                <ThemedText className="text-sm">
                  • Geolocation Services: The Service Provider utilizes location data to provide features such as
                  personalized content, relevant recommendations, and location-based services.
                </ThemedText>
                <ThemedText className="text-sm">
                  • Analytics and Improvements: Aggregated and anonymized location data helps the Service Provider to
                  analyze user behavior, identify trends, and improve the overall performance and functionality of the
                  Application.
                </ThemedText>
                <ThemedText className="text-sm">
                  • Third-Party Services: Periodically, the Service Provider may transmit anonymized location data to
                  external services. These services assist them in enhancing the Application and optimizing their
                  offerings.
                </ThemedText>
              </View>

              <ThemedText className="text-sm">
                The Service Provider may use the information you provided to contact you from time to time to provide
                you with important information, required notices and marketing promotions.
              </ThemedText>
              <ThemedText className="text-sm">
                For a better experience, while using the Application, the Service Provider may require you to provide us
                with certain personally identifiable information. The information that the Service Provider request will
                be retained by them and used as described in this privacy policy.
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Third Party Access
              </ThemedText>
              <ThemedText className="text-sm">
                Only aggregated, anonymized data is periodically transmitted to external services to aid the Service
                Provider in improving the Application and their service. The Service Provider may share your information
                with third parties in the ways that are described in this privacy statement.
              </ThemedText>
              <ThemedText className="text-sm">
                Please note that the Application utilizes third-party services that have their own Privacy Policy about
                handling data. Below are the links to the Privacy Policy of the third-party service providers used by
                the Application:
              </ThemedText>

              <ThemedText className="text-sm" style={{ color: Colors[theme].secondary }}>
                • Google Play Services: https://www.google.com/policies/privacy/
              </ThemedText>

              <View style={{ paddingLeft: 20 }}>
                <ThemedText className="text-sm">
                  • as required by law, such as to comply with a subpoena, or similar legal process;
                </ThemedText>
                <ThemedText className="text-sm">
                  • when they believe in good faith that disclosure is necessary to protect their rights, protect your
                  safety or the safety of others, investigate fraud, or respond to a government request;
                </ThemedText>
                <ThemedText className="text-sm">
                  • with their trusted services providers who work on their behalf, do not have an independent use of
                  the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy
                  statement.
                </ThemedText>
              </View>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Opt-Out Rights
              </ThemedText>
              <ThemedText className="text-sm">
                You can stop all collection of information by the Application easily by uninstalling it. You may use the
                standard uninstall processes as may be available as part of your mobile device or via the mobile
                application marketplace or network.
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Data Retention Policy
              </ThemedText>
              <ThemedText className="text-sm">
                The Service Provider will retain User Provided data for as long as you use the Application and for a
                reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via
                the Application, please contact them at contact_us@healthera.com and they will respond in a reasonable
                time.
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Children
              </ThemedText>
              <ThemedText className="text-sm">
                The Service Provider does not use the Application to knowingly solicit data from or market to children
                under the age of 13.
              </ThemedText>
              <ThemedText className="text-sm">
                The Application does not address anyone under the age of 13. The Service Provider does not knowingly
                collect personally identifiable information from children under 13 years of age. In the case the Service
                Provider discover that a child under 13 has provided personal information, the Service Provider will
                immediately delete this from their servers. If you are a parent or guardian and you are aware that your
                child has provided us with personal information, please contact the Service Provider
                (contact_us@healthera.com) so that they will be able to take the necessary actions.
              </ThemedText>

              {/* Continue with other sections similarly... */}
              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Security
              </ThemedText>
              <ThemedText className="text-sm">
                The Service Provider is concerned about safeguarding the confidentiality of your information. The
                Service Provider provides physical, electronic, and procedural safeguards to protect information the
                Service Provider processes and maintains.
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Changes
              </ThemedText>
              <ThemedText className="text-sm">
                This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify
                you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are
                advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of
                all changes.
              </ThemedText>
              <ThemedText className="text-sm">This privacy policy is effective as of 2024-09-25</ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Your Consent
              </ThemedText>
              <ThemedText className="text-sm">
                By using the Application, you are consenting to the processing of your information as set forth in this
                Privacy Policy now and as amended by us.
              </ThemedText>

              <ThemedText className="text-lg" style={{ fontWeight: "bold", color: Colors[theme].accent }}>
                Contact Us
              </ThemedText>
              <ThemedText className="text-sm">
                If you have any questions regarding privacy while using the Application, or have questions about the
                practices, please contact the Service Provider via email at contact_us@healthera.com.
              </ThemedText>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PrivacyPolicyScreen;
