import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import {
  DatePicker,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Textarea,
  Button,
  Right,
  H3,
  Body,
  ListItem,
  CheckBox,
} from "native-base";
import SignaturePad from "react-native-signature-pad";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://graphql-prod.azurewebsites.net/graphql",
});

export default class Declartion extends Component {
  state = {
    checked1: false,
    checked2: false,
    checked3: false,
    show: true,
    drawing: "",
  };

  data = async () => {
    console.log("i am called");
    let query = gql`
      mutation {
        createPatient(
          data: {
            name: "Patient"
            Health_Insurance_Company: 1
            Health_Membership_Number: "055555"
            Patient_Title: "Mr"
            Patient_Forenames: "My Forename"
            Patient_Surname: "My Surname"
            DOB: "1987-06-06"
            Address: "Address"
            Phone_Number: "+353857582281"
            Did_Patient_Elect_To_Be_Private_YesNo: "Yes"
            ts_Symptoms_First_Noticed: "2020-01-01 11:48"
            ts_Doctor_First_Consulted_MedHistory: "2020-01-01 11:48"
            Previously_Claimed_For_Illness_YesNo: "Yes"
            ts_Date_When_Claimed_For_This_Illness_Before: "2020-01-01 11:48"
            Name_Of_Doctor_Fisrt_Attended_Referral: "Name_Of_Doctor_Fisrt_Attended_Referral"
            ts_Date_Of_Doctor_First_Attended_Referral: "2020-01-01 11:48"
            Address_Of_Doctor_First_Attended_Referral: "Address_Of_Doctor_First_Attended_Referral"
            Admission_IsResult_Of_Accident_YesNo: "Yes"
            ts_Date_of_Accident: "2020-01-01 11:48"
            Where_Did_Accident_Injury_Occur: "at home"
            How_Did_Accident_Injury_Occur: "Trip"
            Was_Accident_Injury_Fault_of_Another_Party_YesNo: "Yes"
            Contact_Information_of_Responsible_Party: "Responsible Party Contact"
            Responsible_Party_Insurance_Company_Information: "FBD"
            Are_You_Claiming_Expenses_Via_PIAB_YesNo: "No"
            Are_You_Claiming_Expenses_Via_Solicitor_YesNo: "No"
            Name_Address_of_Solicitor_If_Applicable: "Solicitor Name"
            Agreed_to_Declaration_Consent: "Yes"
            Agreed_to_Dataprotection: "Yes"
            Agreed_to_MedoSync_Information_Processing: "Yes"
            Patient_Signature: "base64 signature "
            ts_Date_Patient_Signature: "2020-05-27 20:18"
            PatientPaidByCashOrCard: "Cash"
            fever_or_Chills_YesNo: "No"
            cough_YesNo: "No"
            shortness_of_breath_YesNo: "No"
            flu_like_symptoms_YesNo: "No"
            exposed_to_confirmed_Covid19_case_YesNo: "Yes"
            Travel_abroad_last_two_weeks_YesNo: "Yes"
            Worked_In_Covid19_Healthcare_facility_abroad_YesNo: "Yes"
            hospitalId: "1"
          }
        ) {
          patient {
            name
            id
            uuid
            Patient_Title
            Patient_Forenames
            Patient_Surname
            Health_Insurance_Company
            Health_Membership_Number
            MRN
            DOB
            Address
            Phone_Number
            Did_Patient_Elect_To_Be_Private_YesNo
            ts_Symptoms_First_Noticed
            ts_Doctor_First_Consulted_MedHistory
            ts_Date_When_Claimed_For_This_Illness_Before
            Name_Of_Doctor_Fisrt_Attended_Referral
            ts_Date_Of_Doctor_First_Attended_Referral
            Address_Of_Doctor_First_Attended_Referral
            Admission_IsResult_Of_Accident_YesNo
            ts_Date_of_Accident
            Was_Accident_Injury_Fault_of_Another_Party_YesNo
            Contact_Information_of_Responsible_Party
            Responsible_Party_Insurance_Company_Information
            Are_You_Claiming_Expenses_Via_PIAB_YesNo
            Are_You_Claiming_Expenses_Via_Solicitor_YesNo
            Name_Address_of_Solicitor_If_Applicable
            Patient_Signature
            ts_Date_Patient_Signature
            ts_Admit_Date
            ts_Discharge_Date
          }
        }
      }
    `;
    try {
      let data = await new ApolloClient({
        uri: "https://graphql-prod.azurewebsites.net/graphql",
        // headers: {
        //   "Content-Type": "application/json"
        // },
      }).mutate({ mutation: query });
      if (data) {
        console.log("data>>>>>>>>>>>", data);
        // return data;
      }
    } catch (error) {
      console.log("data>>>>>>>>>>>error", error);

      alert(error);
    }
  };
  componentDidMount() {
    console.log(this.props.route.params.item);
  }
  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({ base64DataUrl }) => {
    this.setState({
      drawing: base64DataUrl,
    });
  };
  clear() {
    this.setState({ show: false, drawing: "" });
    setTimeout(() => {
      this.setState({ show: true });
    }, 0);
  }
  handleNext() {
    const { checked1, checked2, checked3, drawing } = this.state;
    if (!checked1 && !checked2 && !checked3) {
      alert("You must agree with all the terms");
      return;
    }
    if (drawing == "") {
      alert("Signature required");
      return;
    }
    const item = { ...this.props.route.params.item, drawing };
    this.props.navigation.navigate("Verification", { item: item });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View
          style={{
            borderColor: "skyblue",
            borderWidth: 1,
            backgroundColor: "skyblue",
          }}
        >
          <View style={styles.Header}>
            <Text style={styles.SubHeading}>5. Declartion</Text>
            <View style={{ padding: 6 }}>
              <H3>Data Protection Statement</H3>
              <Text>
                The information you provide will be used to manage the
                administration of your policy and is held in accordance with the
                Data Protection Acts 1988 and 2003 (as amended). We may need to
                collect sensitive information (such as medical information)
                about you and others named on the insurance policy. By providing
                this information you will be agreeing to us or our agents or
                other insurers processing that information for the purpose
                outlined above. In the event that your treatment has involved
                another person, or if their details are likely to be documented
                in your Medical Notes/File, then their express consent should be
                acquired in advance of sharing sensitive data. Medical
                information will be kept confidential and may be disclosed, on a
                strictly confidential basis to those involved with your
                treatment or care or their health professional agents.
                Information may also be shared with other insurers, either
                directly or through people acting for the insurer such as
                Investigators and where we are entitled to do so under the Data
                Protection Acts. However, anonymised data – that is, information
                which does not identify an individual – may be used by laya
                healthcare, or disclosed to others, for research or statistical
                purposes. Access to non-medical information may be granted by
                laya healthcare to others on a strictly confidential basis in
                the course of and for the purpose of the efficient
                administration of laya healthcare (for example in connection
                with audit, systems development, managing and improving our
                services). You have a right to apply for a copy of the
                information held by us about you (for which a small charge, not
                exceeding €6.35, may apply) and you have a right to have any
                inaccuracies in your information corrected. Please send your
                request in writing to the Information Protection Manager, at
                laya healthcare, Eastgate Road, Eastgate Business Park, Little
                Island, Co Cork.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                }}
              >
                <CheckBox
                  checked={this.state.checked1}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    this.setState({
                      checked1: !this.state.checked1,
                    });
                  }}
                />

                <Text>Agree</Text>
              </View>
              <H3>Declaration and Consent</H3>
              <Text>
                I declare that at the time the expenses were incurred I/the
                patient was entitled to private medical insurance benefits under
                my/the patient’s chosen laya healthcare scheme. I declare that
                my/the patient’s doctor recommended the specialist treatment and
                to the best of my knowledge and belief the information given on
                this form is true and complete. I authorise and request the
                hospital/specialist/ consultant/physician/health provider
                concerned to furnish laya healthcare or its duly authorised
                agents acting on its behalf (including, but not limited to,
                medical professionals whose services are retained by laya
                healthcare for the purpose of assessing claims) with all
                necessary information as laya healthcare or its authorised
                agents may seek in connection with any treatment or other
                services provided to me or my dependant(s) for the purpose of
                laya healthcare considering this claim. This includes copies of
                hospital/medical records related to a claim made by me, by which
                I mean the following in particular:
              </Text>
              <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} records of physical or mental illness or ill-health
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} medical histories
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} records of treatments obtained by me
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} length of any stay in a hospital
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} discharge summaries
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} previous insurance details
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} other treatments or services received by me or my
                  dependant(s)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                }}
              >
                <CheckBox
                  checked={this.state.checked2}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    this.setState({
                      checked2: !this.state.checked2,
                    });
                  }}
                />

                <Text>Agree</Text>
              </View>
              <Text>
                I confirm that I have read and understood the Data Protection
                Notice above. I confirm that I give explicit consent within the
                meaning of the Data Protection Acts 1988 & 2003 (as amended) to
                my/the patient’s sensitive personal information (including
                my/the patient’s hospital/medical records) being collected by
                Laya Healthcare or its authorised agents. Laya Healthcare may
                use this information that I have provided:
              </Text>
              <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} For managing and administering my insurance policy
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} For underwriting and claims handling
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} To analyse, examine or clinically audit the care,
                  claims processes and treatment/
                  overnight-stay/convalescence/care pathway options
                  applied/utilised by medical service providers
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  {"\u25CF"} To examine the handling of claims by a medical
                  service provider. Medical service provider means any hospital
                  or doctor (or other healthcare professional service which is
                  relevant)
                </Text>
              </View>
              <Text>
                I confirm that I give explicit consent to this sensitive
                personal data being held, used and processed for the above
                purposes and for undertaking investigations into, and to
                adjudicate on, my/the patient’s claim (including investigations
                into the length of my/ the patient’s hospital stay and the
                treatment I/the patient received whilst in hospital). I have
                examined and accept the accounts submitted in respect of this
                claim. Charges not eligible for benefit remain my responsibility
                to settle directly with the hospital and doctors concerned. I
                direct and authorise that all medical expenses (paid out by laya
                healthcare) recovered from the third party responsible for
                my/the patient’s injuries shall be refunded by my solicitor
                directly to laya healthcare. I further direct my solicitor to
                deduct these amounts from my settlement cheque and reimburse
                laya healthcare directly. In the event that medical expenses
                recovered from the third party are refunded directly to me the
                member I agree to refund these monies directly to laya
                healthcare.
              </Text>
              <Text style={{ marginVertical: 20 }}>
                I confirm that I have given explicit consent for MedoSync
                Limited to process this claim on behalf of you the patient,
                MyMedical Limited and laya healthcare.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <CheckBox
                  checked={this.state.checked3}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    this.setState({
                      checked3: !this.state.checked3,
                    });
                  }}
                />

                <Text>Agree</Text>
              </View>
              {/* signature area */}
              {this.state.show ? (
                <SignaturePad
                  onError={this._signaturePadError}
                  onChange={this._signaturePadChange}
                  style={styles.SignaturePad}
                />
              ) : null}

              <Button
                onPress={() => this.clear()}
                style={{
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "red",
                  borderRadius: 0,
                  width: 100,
                  alignSelf: "flex-end",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "red" }}>Clear</Text>
              </Button>
              {/* signature area */}
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 10,
            alignItems: "flex-end",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            primary
            onPress={() => {
              this.handleNext();
              // this.data();
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Next
            </Text>
            <Icon name="send" />
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 70,
  },
  Header: {
    backgroundColor: "white",
  },
  SubHeading: {
    paddingHorizontal: 4,
    backgroundColor: "#42b0f5",
    fontSize: 17,
    color: "white",
    paddingVertical: 5,
  },
  SignaturePad: {
    height: 400,
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "white",
  },
});
