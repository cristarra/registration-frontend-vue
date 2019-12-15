<template>
  <div>
    <div class="registration">
      <h1>Registration</h1>
      <div class="input-row tooltip">
        <input class="input-text" type="tel" placeholder="Mobile Number" required>
        <div class="top">
          <p>Please enter valid Indonesian phone number</p>
          <i></i>
        </div>
      </div>
      <div class="input-row">
        <input class="input-text" type="text" placeholder="First Name" required>
      </div>
      <div class="input-row">
        <input class="input-text" type="text" placeholder="Last Name" required>
      </div>
      <div class="input-row">
        <label class="select-label">Date of Birth</label>
        <div>
          <select>
            <option value="00">Month</option>
          </select>
          <select>
            <option value="00">Date</option>
          </select>
          <select>
            <option value="0000">Year</option>
          </select>
        </div>
      </div>
      <div class="input-row">
        <input type="radio"  class="input-radio" name="gender" id="male" value="male"/>
        <label for="male">Male</label>

        <input type="radio" class="input-radio" name="gender" id="female" value="female"/>
        <label for="female">Female</label>
      </div>
      <div class="input-row">
        <input class="input-text" type="email" placeholder="Email" required>
      </div>
      <div class="input-row">
        <button class="input-button">Register</button>
      </div>
    </div>
    <div class="login" v-show="isLoginActive">
      <div class="input-row">
        <button class="input-button">Login</button>
      </div>
    </div>
    <div class="footer">
      Footer
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      isLoginActive:false
    }
  },
  methods: {
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
                alert(JSON.stringify(response.data))
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
        alert(JSON.stringify(response.data))
      }).catch((error)=>{
        alert(JSON.stringify(error))
      })
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
</style>
