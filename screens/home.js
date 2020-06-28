import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
  Dimensions,
  Image,
} from "react-native";
import DatePicker from "react-native-datepicker";
import DatePicker1 from 'react-native-datepicker';
import {
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Textarea,
  Button,
  Right,
} from "native-base";
import moment from "moment";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import RadioForm from "react-native-simple-radio-button";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
var radio_props = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];
export const format = "YYYY-MM-DD" //yyyy-mm-dd hh:mm
export const format2 = "YYYY-MM-DD hh:mm"
const { width } = Dimensions.get("window");
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fever: -1,
      cough: -1,
      breath_short: -1,
      sore_throat: -1,
      confirmed: -1,
      travel: -1,
      healthcare: -1,
      private: false,
      chosenDate: new Date(),
      showReferal: false,
      membership: "",
      selected: "",
      title: "",
      forename: "",
      surname: "",
      dob: '',
      address: "",
      phone_number: "",
      private_patient: -1,
      first_symtomps: '',
      first_consult: '',
      related: -1,
      related_date: '',
      name_of_doctor: "",
      doctor_date: '',
      doctor_address: "",
    };
  }
  handlePrivate(value) {
    this.setState({ private_patient: value });
    if (value === 0) {
      alert(
        "Your insurance company will not be charged, you will be charged the full price of the treatment because you did not elect to be private"
      );
    }
  }
  handlePrevious(value) {
    this.setState({ related: value });
    if (value === 1) {
      this.setState({
        showReferal: true,
      });
    } else {
      this.setState({
        showReferal: false,
      });
    }
  }
  handleNext() {
    const {
      fever,
      cough,
      membership,
      breath_short,
      sore_throat,
      confirmed,
      travel,
      healthcare,
      selected,
      title,
      forename,
      surname,
      dob,
      address,
      phone_number,
      private_patient,
      first_symtomps,
      first_consult,
      related,
      related_date,
      name_of_doctor,
      doctor_date,
      doctor_address,
    } = this.state;
    const item = {
      fever,
      cough,
      breath_short,
      sore_throat,
      confirmed,
      travel,
      healthcare,
      selected,
      membership,
      title,
      forename,
      surname,
      dob,
      address,
      phone_number,
      private_patient,
      first_symtomps,
      first_consult,
      related,
      related_date,
      name_of_doctor,
      doctor_date,
      doctor_address,
    };

    if (
      fever !== -1 &&
      cough !== -1 &&
      breath_short !== -1 &&
      sore_throat !== -1 &&
      confirmed !== -1 &&
      travel !== -1 &&
      healthcare !== -1 &&
      selected !== undefined &&
      title !== undefined &&
      forename !== undefined &&
      surname !== undefined &&
      dob !== undefined &&
      address !== undefined &&
      phone_number !== undefined &&
      private_patient !== undefined &&
      first_symtomps !== undefined
    ) {
      this.props.navigation.navigate("Accident", {
        item: item,
      });
    } else {
      alert("All fields required");
    }
    // AsyncStorage.setItem("homeValues", JSON.stringify(item));
  }
  componentDidMount() {
    // if (AsyncStorage.getItem("homeValues")) {
    //   AsyncStorage.getItem("homeValues").then((item) => {
    //     this.setState({
    //       fever: JSON.parse(item).fever,
    //       cough: JSON.parse(item).cough,
    //       breath_short: JSON.parse(item).breath_short,
    //       sore_throat: JSON.parse(item).sore_throat,
    //       confirmed: JSON.parse(item).confirmed,
    //       travel: JSON.parse(item).travel,
    //       healthcare: JSON.parse(item).healthcare,
    //       membership: JSON.parse(item).membership,
    //       title: JSON.parse(item).title,
    //       forename: JSON.parse(item).forename,
    //       surname: JSON.parse(item).surname,
    //       dob: JSON.parse(item).dob,
    //       address: JSON.parse(item).address,
    //       phone_number: JSON.parse(item).phone_number,
    //       private_patient: JSON.parse(item).private_patient,
    //       first_symtomps: JSON.parse(item).first_symtomps,
    //       related: JSON.parse(item).related,
    //       related_date: JSON.parse(item).related_date,
    //       name_of_doctor: JSON.parse(item).name_of_doctor,
    //       doctor_date: JSON.parse(item).doctor_date,
    //       doctor_address: JSON.parse(item).doctor_address,
    //     });
    //   });
    // }
  }
  render() {
    console.disableYellowBox = true;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{
            width,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ resizeMode: "contain", height: '75%', marginTop: 30 }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.Container}>
          <View style={{ marginBottom: 10 }}>
            <View style={styles.Header}>
              <Text style={styles.CoronaHeading}>
                Important notice: We require patients to fill out the following
                COVID-19 questions.
              </Text>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Have you had a fever or chills in the past 7 days?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={this.state.fever}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ fever: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Do you have a cough (new or worsening)?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ cough: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Do you have shortness of breath (new or worsening)?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ breath_short: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Do you have a sore throat, runny nose, flu-like symptoms (New
                  or worsening)?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ sore_throat: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Were you exposed to a confirmed COVID-19 case within the last
                  2 weeks?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ confirmed: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Have you travelled outside Ireland within the last 2 weeks?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ travel: e });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "rgba(0,0,0,0.1)",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={
                    (styles.Paragraph,
                    {
                      marginHorizontal: 10,
                      fontSize: 16,
                      marginVertical: 10,
                    })
                  }
                >
                  Have you worked in or attended a healthcare facility abroad
                  where patients with COVID-19 were being treated?
                </Text>

                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => {
                    this.setState({ healthcare: e });
                  }}
                />
              </View>
            </View>
          </View>

          {/* corona section end */}

          {/* section 1 start */}
          <View
            style={{
              borderColor: "skyblue",
              borderWidth: 1,
              backgroundColor: "#42d7f5",
              padding: 2,
            }}
          >
            <View style={styles.Header}>
              <Text style={styles.SubHeading}>1. Policy Details</Text>
              <View style={{ marginTop: 10 }}>
                <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                  Membership Number
                  <Icon
                    active
                    name="help"
                    style={{
                      fontSize: 40,
                      color: "blue",
                    }}
                    onPress={() => {
                      alert(
                        "You can find your membership number from the Laya App or leave blank if you dont know it."
                      );
                    }}
                  />
                </Label>
              </View>
              <View style={{ padding: 10 }}>
                <SmoothPinCodeInput
                  androidMode="default"
                  cellSize={29}
                  codeLength={10}
                  value={this.state.membership}
                  onTextChange={(e) => {
                    this.setState({ membership: e });
                  }}
                />
              </View>
              <Picker
                mode="dropdown"
                iosHeader="Insurance Company"
                iosIcon={
                  <Icon
                    name="arrow-dropdown-circle"
                    style={{ color: "#007aff", fontSize: 25 }}
                  />
                }
                placeholder="Please Select Insurance Company"
                placeholderStyle={{ color: "rgba(0,0,0,0.7)" }}
                placeholderIconColor="#007aff"
                style={{
                  width: width - 40,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  marginLeft: 5,
                  marginBottom: 10,
                }}
                selectedValue={this.state.selected}
                onValueChange={(e) => {
                  this.setState({ selected: e });
                }}
              >
                <Picker.Item label="Laya - Dublin" value="Dublin" />
                <Picker.Item label="Laya - Galway" value="Galway" />
                <Picker.Item label="Laya - Limerick" value="Limerick" />
              </Picker>
            </View>

            <View style={styles.Header}>
              <Item>
                <Picker
                  mode="dropdown"
                  iosHeader="Title"
                  iosIcon={
                    <Icon
                      name="arrow-dropdown-circle"
                      style={{ color: "#007aff", fontSize: 25 }}
                    />
                  }
                  placeholder="Title"
                  placeholderStyle={{ color: "rgba(0,0,0,0.7)" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined, marginTop: 10 }}
                  selectedValue={this.state.title}
                  onValueChange={(e) => {
                    this.setState({ title: e });
                  }}
                >
                  <Picker.Item label="Mr." value="Mr" />
                  <Picker.Item label="Ms." value="Ms" />
                  <Picker.Item label="Miss." value="Miss" />
                  <Picker.Item label="Mrs." value="Mrs" />
                  <Picker.Item label="Dr." value="Dr" />
                  <Picker.Item label="Prof." value="Prof" />
                </Picker>
              </Item>
              <Item floatingLabel style={{ marginTop: 10 }}>
                <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                  Forenames
                </Label>

                <Input
                  style={{ paddingLeft: 12 }}
                  onChangeText={(e) => {
                    this.setState({ forename: e });
                  }}
                  value={this.state.forename}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 10 }}>
                <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                  Surnames
                </Label>

                <Input
                  style={{ paddingLeft: 12 }}
                  onChangeText={(e) => {
                    this.setState({ surname: e });
                  }}
                  value={this.state.surname}
                />
              </Item>
              <Label
                style={{
                  marginHorizontal: 13,
                  marginTop: 20,
                  fontSize: 16,
                  color: "gray",
                }}
              >
                Date of Birth
              </Label>
              <DatePicker
                style={{ width: width - 45, marginTop: 20, marginLeft: 13, }}
                date={this.state.dob}
                mode="date"
                androidMode='spinner'
                maxDate={moment(new Date(), format).format(format)}

                format={format}
                placeholder="Select date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={<FontAwesome name="calendar-check-o" size={25} color="rgba(0,0,0,0.7)"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 4,
                    marginLeft: 0,
                  }}
                />}
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  dateInput: {
                    // marginLeft: 5,
                  },
                  dateText: {
                    color: '#000',
                    placeholderTextColor: 'red',
                    fontSize: 16,
                    // fontFamily: 'Gilroy-Bold',
                    numberOfLines: 1
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: 'gray'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ dob: moment(date, format2).format(format2) });
                }}
              /> */}

              <Item floatingLabel style={{ marginTop: 10 }}>
                <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                  Address
                </Label>
                <Icon name="home" style={{ color: "#354ce9", fontSize: 20 }} />
                <Input
                  style={{ paddingLeft: 12 }}
                  value={this.state.address}
                  onChangeText={(e) => {
                    this.setState({ address: e });
                  }}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 10 }}>
                <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                  Telephone
                </Label>

                <Input
                  style={{ paddingLeft: 12 }}
                  value={this.state.phone_number}
                  keyboardType={'phone-pad'}
                  onChangeText={(e) => {
                    this.setState({ phone_number: e });
                  }}
                />
              </Item>
            </View>
          </View>
          {/* section 1 end */}
          {/* private section start */}
          <View
            style={[
              styles.Header,
              { borderWidth: 2, borderColor: "skyblue", marginVertical: 10 },
            ]}
          >
            <Text
              style={
                (styles.Paragraph,
                {
                  marginHorizontal: 10,
                  fontSize: 16,
                  marginVertical: 10,
                })
              }
            >
              Did you elect to be a private patient of consultant?
            </Text>

            <RadioForm
              labelHorizontal={false}
              formHorizontal={true}
              style={{ margin: 10 }}
              initial={2}
              buttonSize={20}
              buttonOuter
              animation={false}
              radio_props={radio_props}
              onPress={(e) => this.handlePrivate(e)}
            />
          </View>

          {/* private section end  */}
          {/* section 2 start */}
          <View
            style={{
              borderColor: "skyblue",
              borderWidth: 1,
              backgroundColor: "#42d7f5",
              padding: 2,
            }}
          >
            <View style={styles.Header}>
              <Text style={styles.SubHeading}>
                2. History of illness Section
              </Text>
              <Label
                style={{ marginHorizontal: 13, marginTop: 20, fontSize: 16 }}
              >
                When did you/the patient first notice symtomps? (DD-MM-YYYY)
              </Label>
              <DatePicker
                style={{ width: width - 45,marginLeft: 13,marginVertical: 20  }}
                date={this.state.first_symtomps}
                mode="datetime"
                androidMode='spinner'
                placeholder="Select date"
                maxDate={moment(new Date(),format2).format(format2)}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                format={format2}
                iconComponent={<FontAwesome name="calendar-check-o" size={25} color="rgba(0,0,0,0.7)"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 4,
                    marginLeft: 0,
                  }}
                />}
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  dateInput: {
                    // marginLeft: 36,
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: 'gray'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ first_symtomps: moment(date, format2).format(format2) });
                }}
              />
            </View>
            <View style={styles.Header}>
              <Label
                style={{ marginHorizontal: 13, marginTop: 20, fontSize: 16 }}
              >
                When did you/the patient first consult with a doctor for this
                condition? (DD-MM-YYYY)
              </Label>
              <DatePicker
                style={{ width: width - 45,marginLeft: 13,marginVertical: 20  }}
                date={this.state.first_consult}
                mode="datetime"
                androidMode={'spinner'}
                placeholder="Select date"
                maxDate={new Date()}
                format={format2}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={<FontAwesome name="calendar-check-o" size={25} color="rgba(0,0,0,0.7)"
                style={{
                  position: "absolute",
                  left: 10,
                  top: 4,
                  marginLeft: 0,
                }}
              />}
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  // dateInput: {
                  //   marginLeft: 36,
                  // },
                  placeholderText: {
                    fontSize: 16,
                    color: 'gray'
                  }
                  // ... You can check the source to find the other keys.
                }}
                
                onDateChange={(date) => {
                  this.setState({ first_consult: moment(date, format2).format(format2) });
                }}
              />
            </View>
            <View style={styles.Header}>
              <Text
                style={
                  (styles.Paragraph,
                  {
                    marginHorizontal: 10,
                    fontSize: 16,
                    marginVertical: 10,
                  })
                }
              >
                Have you/the patient claimed for this or related conditions
                before?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <RadioForm
                  labelHorizontal={false}
                  formHorizontal={true}
                  style={{ margin: 10 }}
                  initial={2}
                  buttonSize={20}
                  buttonOuter
                  animation={false}
                  radio_props={radio_props}
                  onPress={(e) => this.handlePrevious(e)}
                />
              </View>
              <Label
                style={{ marginHorizontal: 13, marginTop: 20, fontSize: 16 }}
              >
                If yes, when ? (DD-MM-YYYY)
              </Label>
              <DatePicker
                style={{ width: width - 45,marginLeft: 13,marginVertical: 20  }}
                date={this.state.related_date}
                mode="datetime"
                androidMode={'spinner'}
                iconComponent={<FontAwesome name="calendar-check-o" size={25} color="rgba(0,0,0,0.7)"
                style={{
                  position: "absolute",
                  left: 10,
                  top: 4,
                  marginLeft: 0,
                }}
              />}
              format={format2}
                placeholder="Select date"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  // dateInput: {
                  //   marginLeft: 36,
                  // },
                  placeholderText: {
                    fontSize: 16,
                    color: 'gray'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ related_date: moment(date, format2).format(format2) });
                }}
              />
            </View>
          </View>
          {/*section 2 end  */}

          {/* section 3 start */}

          {this.state.showReferal ? (
            <View
              style={{
                borderColor: "skyblue",
                borderWidth: 1,
                backgroundColor: "#42d7f5",
                padding: 2,
                marginTop: 10,
              }}
            >
              <View style={styles.Header}>
                <Text style={styles.SubHeading}>3. Referral Details</Text>

                <Item floatingLabel style={{ marginTop: 10 }}>
                  <Label style={{ marginHorizontal: 13, fontSize: 16 }}>
                    Name of Doctor first attended
                  </Label>

                  <Input
                    style={{ paddingLeft: 12 }}
                    value={this.state.name_of_doctor}
                    onChangeText={(e) => {
                      this.setState({ name_of_doctor: e });
                    }}
                  />
                </Item>
              </View>
              <View style={styles.Header}>
                <Label
                  style={{
                    marginHorizontal: 13,
                    marginTop: 20,
                    fontSize: 16,
                  }}
                >
                  Date (DD-MM-YYYY):
                </Label>
                <DatePicker
                  style={{ width: width - 45,marginLeft: 13,marginVertical: 20  }}
                  date={this.state.doctor_date}
                  mode="datetime"
                  androidMode={'spinner'}
                  iconComponent={<FontAwesome name="calendar-check-o" size={25} color="rgba(0,0,0,0.7)"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 4,  
                    marginLeft: 0,
                  }}
                />}
                format={format2}
                  placeholder="Select date"
                  maxDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateIcon: {
                    //   position: "absolute",
                    //   left: 0,
                    //   top: 4,
                    //   marginLeft: 0,
                    // },
                    // dateInput: {
                    //   marginLeft: 36,
                    // },
                    placeholderText: {
                      fontSize: 16,
                      color: 'gray'
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({ doctor_date: moment(date, format2).format(format2) });
                  }}
                />
              </View>
              <View style={styles.Header}>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Doctor's address"
                  onChangeText={(e) => {
                    this.setState({ doctor_address: e });
                  }}
                  value={this.state.doctor_address}
                />
              </View>
            </View>
          ) : null}

          {/* section 3 end  */}

          {/* next button */}

          <Item style={{ borderBottomColor: "white", marginVertical: 10 }}>
            <Right>
              <Button
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
                primary
                onPress={() => this.handleNext()}
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
            </Right>
          </Item>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginVertical: 2,
  },
  SubHeading: {
    paddingHorizontal: 4,
    backgroundColor: "#4bb4da",
    fontSize: 17,
    color: "white",
    paddingVertical: 5,
  },
  CoronaHeading: {
    paddingHorizontal: 6,
    backgroundColor: "#ffee00",
    fontSize: 18,
    color: "black",
    fontWeight: "700",
    paddingVertical: 5,
  },
  Paragraph: {
    fontSize: 16,
  },
});
