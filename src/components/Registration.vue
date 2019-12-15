<template>
  <div>
    <div class="registration" :disabled="isDisabledForm">
      <h1>Registration</h1>
      <p v-show="errorMsg" class="error-msg">{{errorMsg}}</p>
      <div class="input-row tooltip">
        <input class="input-text" type="tel" placeholder="Mobile Number" required v-model="phoneNumber" @input="checkPhoneNumberFormat">
        <div class="top" v-show="isPhoneNumberError">
          <p>{{phoneNumberErrorMsg}}</p>
          <i></i>
        </div>
      </div>
      <div class="input-row tooltip">
        <input class="input-text" type="text" placeholder="First Name" required v-model="firstName" @input="checkFirstNameFormat">
        <div class="top" v-show="isFirstNameError">
          <p>{{firstNameErrorMsg}}</p>
          <i></i>
        </div>
      </div>
      <div class="input-row tooltip">
        <input class="input-text" type="text" placeholder="Last Name" required v-model="lastName" @input="checkLastNameFormat">
        <div class="top" v-show="isLastNameError">
          <p>{{lastNameErrorMsg}}</p>
          <i></i>
        </div>
      </div>
      <div class="input-row">
        <label class="select-label">Date of Birth</label>
        <div>
          <select v-model="monthOfBirth">
            <option value="00">Month</option>
            <option v-for="month in month" :value="month" v-bind:key="month">{{ month }}</option>
          </select>
          <select v-model="dateOfBirth">
            <option value="00">Date</option>
            <option v-for="date in date" :value="date" v-bind:key="date">{{ date }}</option>
          </select>
          <select v-model="yearOfBirth">
            <option value="0000">Year</option>
            <option v-for="year in years" :value="year" v-bind:key="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <div class="input-row">
        <input type="radio"  class="input-radio" name="gender" id="male" value="male" v-model="gender" @click="(gender=='male'?gender='':gender='male')"/>
        <label for="male">Male</label>

        <input type="radio" class="input-radio" name="gender" id="female" value="female" v-model="gender" @click="(gender=='female'?gender='':gender='female')"/>
        <label for="female">Female</label>
      </div>
      <div class="input-row tooltip">
        <input class="input-text" type="email" placeholder="Email" required v-model="email"  @input="checkEmailFormat">
        <div class="top" v-show="isEmailError">
          <p>{{emailErrorMsg}}</p>
          <i></i>
        </div>
      </div>
      <div class="input-row">
        <button class="input-button" @click="registerButtonClicked">Register</button>
      </div>
    </div>
    <div class="login" v-show="isLoginActive">
      <div class="input-row">
        <button class="input-button" @click="goToLoginPage">Login</button>
      </div>
    </div>
    <div class="footer" v-show="isFooterActive">
      Footer
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Registration',
  data () {
    return {
      isLoginActive:false,
      phoneNumber:'',
      firstName:'',
      lastName:'',
      dateOfBirth:'00',
      monthOfBirth:'00',
      yearOfBirth:'0000',
      gender:'',
      email:'',
      isPhoneNumberError:false,
      phoneNumberErrorMsg:'',
      isFirstNameError: false,
      firstNameErrorMsg:'',
      isLastNameError: false,
      lastNameErrorMsg:'',
      isEmailError: false,
      emailErrorMsg:'',
      errorMsg:'',
      isFooterActive:true,
      isDisabledForm:false
    }
  },
  methods: {
    doRegister(){
      let param = {
        email : this.email,
        phone_number: this.phoneNumber,
        first_name: this.firstName,
        last_name: this.lastName,
        gender: this.gender,
        date_of_birth: this.yearOfBirth+'-'+this.monthOfBirth+'-'+this.dateOfBirth
      }

      let options = {
        url: 'user_add/',
        method: 'POST',
        data: new URLSearchParams(param).toString()
      };

      this.$http(options).then(response => {
        if(response.data.status && response.data.status === "SUCCESS") {
          if (response.data.data && response.data.data.result) {
            this.isLoginActive = true
            this.isFooterActive = false
          }else{
            this.errorMsg = 'Unable to register: ' + response.data.data.sql_warning
            this.enableForm()
          }
        }
      }).catch((error)=>{
        alert(JSON.stringify(error))
      })
    },
    checkEmail: function(email){

      let param = {
        email : email
      }

      let options = {
        url: 'user_check_email/',
        method: 'POST',
        data: new URLSearchParams(param).toString()
      };

      this.$http(options).then(response => {
              if(response.data.status && response.data.status === "SUCCESS") {
                  if (response.data.data && response.data.data.email_count && response.data.data.email_count>0 && !this.isDisabledForm) {
                    this.isEmailError = true
                    this.emailErrorMsg = 'This email is already registered'
                  }
                }
              }).catch((error)=>{
                alert(JSON.stringify(error))
              })
    },
    checkPhoneNumber: function(phoneNumber){
      let param = {
        phone_number : phoneNumber
      }

      let options = {
        url: 'user_check_phone_number/',
        method: 'POST',
        data: new URLSearchParams(param).toString()
      };

      this.$http(options).then(response => {
        if(response.data.status && response.data.status === "SUCCESS") {
          if (response.data.data && response.data.data.phone_number_count && response.data.data.phone_number_count>0 && !this.isDisabledForm) {
            this.isPhoneNumberError = true
            this.phoneNumberErrorMsg = 'This phone number is already registered'
          }
        }
      }).catch((error)=>{
        alert(JSON.stringify(error))
      })
    },
    registerButtonClicked: function() {
      if (this.phoneNumber.length>0 && this.email.length>0 & this.firstName.length>0 && this.lastName.length>0
      && !this.isPhoneNumberError && !this.isEmailError && !this.isFirstNameError && !this.isLastNameError) {
        this.disableForm()
        this.doRegister()
      } else {
        this.errorMsg = 'Double check the registration form correctly'
        this.checkPhoneNumberFormat()
        this.checkEmailFormat()
        this.checkFirstNameFormat()
        this.checkLastNameFormat()
        this.enableForm()
      }
    },
    checkPhoneNumberFormat: _.debounce(function () {
      if(this.phoneNumber.substring(0, 3)!=='+62' || this.phoneNumber.length<6) {
        this.isPhoneNumberError = true
        this.phoneNumberErrorMsg = 'Please enter valid Indonesian phone number'
      } else {
        this.checkPhoneNumber(this.phoneNumber)
      }
    }, 1000),
    checkEmailFormat: _.debounce(function () {
      if (!this.validateEmail(this.email)) {
        this.isEmailError = true
        this.emailErrorMsg = 'Please enter valid email address'
      } else {
        this.checkEmail(this.email)
      }
    }, 500),
    checkFirstNameFormat: _.debounce(function () {
      if (this.firstName.length<2) {
        this.isFirstNameError = true
        this.firstNameErrorMsg = 'First name must contain at least two characters'
      }
    }, 1000),
    checkLastNameFormat: _.debounce(function () {
      if (this.lastName.length<2) {
        this.isLastNameError = true
        this.lastNameErrorMsg = 'Last name must contain at least two characters'
      }
    }, 1000),
    validateEmail: function (email) {
      // eslint-disable-next-line no-useless-escape
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    disableForm: function(){
      this.isDisabledForm=true
    },
    enableForm: function(){
      this.isDisabledForm=false
    },
    goToLoginPage: function(){
      this.$parent.showRegisterPage = false
      this.$parent.showLoginPage = true
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    },
    month () {
      return Array.from({length: 13 - 1}, (value, index) => 1 + index)
    },
    date () {
      return Array.from({length: 32 - 1}, (value, index) => 1 + index)
    }
  },
  watch : {
    phoneNumber : function (phoneNumber) {
      this.errorMsg = ''
      this.isPhoneNumberError = false
      this.phoneNumber = phoneNumber.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
      if (this.phoneNumber.substring(0, 1) !== '+') {
          this.phoneNumber = '+'+this.phoneNumber
      }
    },
    email : function () {
      this.errorMsg = ''
      this.isEmailError = false
    },
    firstName: function (firstName) {
      this.errorMsg = ''
      this.isFirstNameError = false
      this.firstName = firstName.replace(/[^A-Za-z ]/g, '').replace(/(\..*)\./g, '$1')
    },
    lastName: function (lastName) {
      this.errorMsg = ''
      this.isLastNameError = false
      this.lastName = lastName.replace(/[^A-Za-z ]/g, '').replace(/(\..*)\./g, '$1')
    }
  },
  created () {
    // this.checkEmail('cris.tarra@gmail.com')
    // this.checkPhoneNumber('+6282220453334')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registration {
  margin: auto;
  background: #eee;
  max-width: 460px;
  padding: 10px 20px;
}
h1{
  font-size: 18px;
}
.input-text{
  max-width: 100%;
  width: 98%;
  border:1.5px solid #333;
  border-radius: 2px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  outline: none;
}
.input-button{
  max-width: 100%;
  width: 100%;
  border:1.5px solid #9D3AB1;
  border-radius: 4px;
  padding:8px;
  outline: none;
  background: #9D3AB1;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.input-row{
  margin-bottom: 20px;
}
.select-label{
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-left: 5px;
}
select{
  border:1.5px solid #333;
  border-radius: 4px;
  outline: none;
  margin-right: 10px;
  padding: 8px;
  height: 30px;
  min-width: 80px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
  text-align-last:center;
  margin-top: 5px;
}
::-webkit-input-placeholder { /* Edge */
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

::placeholder {
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #333;
  font-weight: bold;
  margin-right: 30px;
}

[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #333;
  border-radius: 100%;
  background: #fff;
}

[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: '';
  width: 10px;
  height: 10px;
  background: #333;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.tooltip {
  position:relative;
  border-bottom:1px dotted #666;
  text-align: center;
}

.tooltip .top {
  min-width:250px;
  max-width:60%;
  top:-20px;
  left:59%;
  transform:translate(-40%, -100%);
  color:#ffffff;
  background-color:#ED4134;
  font-weight:normal;
  font-size:12px;
  border-radius:4px;
  position:absolute;
  z-index:99999999;
  box-sizing:border-box;
  border:1px solid #333333;box-shadow:0 1px 8px rgba(0,0,0,0.5);
  display:none;
}

.tooltip .top {
  display:block;
}

.tooltip .top i {
  position:absolute;
  top:100%;
  left:40%;
  margin-left:-12px;
  width:24px;
  height:12px;
  overflow:hidden;
}

.tooltip .top i::after {
  content:'';
  position:absolute;
  width:12px;
  height:12px;
  left:50%;
  transform:translate(-50%,-50%) rotate(45deg);
  background-color:#ED4134;
  border:1px solid #333333;box-shadow:0 1px 8px rgba(0,0,0,0.5);
}
.login{
  margin: 20px auto;
  background: #eee;
  max-width: 460px;
  padding: 30px 20px;
  text-align: center;
}
.login .input-row{
  margin-bottom: 0px;
}
.footer{
  margin: 20px auto;
  max-width: 460px;
  padding: 30px 20px;
  text-align: center;
  font-size: 28px;
  color: #fff;
  background: #9D3AB1;
}
.error-msg{
  font-size: 11px;
  color: #ED4134;
}
div[disabled]
{
  pointer-events: none;
  opacity: 0.4;
}
</style>
