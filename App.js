import {Formik} from 'formik';
import * as Yup from 'yup';
import { Modal, ModalContent, ModalPortal, ModalFooter, ModalButton, ModalTitle } from 'react-native-modals';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [message, setMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [staticData, setStaticData] = React.useState({
    email:'ssss@gmail.com',
    password:'123@Ssss'
  });


  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('No email provided.'),
    pass: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'Password must contain uppercase and lowercase letters, numbers and special characters.',
      ),
  });

  return (
    <SafeAreaView>
      <Formik
        initialValues={{email: '', pass: ''}}
        onSubmit={values => {
          values.email.toLowerCase()===staticData.email.toLowerCase()&&values.pass===staticData.password
          ?setMessage("You are logged in successfully")
          :setMessage("Wrong email or password")
          setVisible(true)
        }}
        validationSchema={SignupSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <Text style={styles.loginLabel}>Log in</Text>
            <View style={styles.formContainer}>
              <View style={{marginBottom: 15}}>
                <Text>Email</Text>
                <TextInput
                  style={
                    errors.email && touched.email
                      ? styles.invalidValuesInputs
                      : styles.inputs
                  }
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.invalidValues}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={{marginBottom: 15}}>
                <Text>Password</Text>
                <TextInput
                  style={
                    errors.pass && touched.pass
                      ? styles.invalidValuesInputs
                      : styles.inputs
                  }
                  onChangeText={handleChange('pass')}
                  onBlur={handleBlur('email')}
                  value={values.pass}
                  secureTextEntry={true}
                />
                {errors.pass && touched.pass ? (
                  <Text style={styles.invalidValues}>{errors.pass}</Text>
                ) : null}
              </View>

              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>

      <Modal
        visible={visible}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        onSwipeOut={event => {
          setVisible(false)
        }}
        onTouchOutside={() => {
          setVisible(false)
        }}
        modalTitle={<ModalTitle title="Message" />}
        footer={
          <ModalFooter>
            <ModalButton
              text="OK"
              onPress={() => {setVisible(false)}}
            />
          </ModalFooter>
        }>
        <ModalContent>
          <Text>{message}</Text>
        </ModalContent>
      </Modal>
      <ModalPortal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#F3F1F5',
  },
  formContainer: {
    width: '80%',
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  inputs: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
  },
  invalidValuesInputs: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    borderColor: 'red',
  },
  loginLabel: {
    fontSize: 30,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  invalidValues: {
    color: 'red',
  },
});

export default App;
