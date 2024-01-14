<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email</label>
    <input type="email" id="email" v-model="email" required>

    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" required>
    <div class="error" v-if="passwordError != ''">{{ passwordError }}</div>

    <label for="role">role</label>
    <select id="role" v-model="role">
        <option value="developer">Web Developer</option>
        <option value="designer">Web Designer</option>
    </select>

    <div class="terms">
        <input type="checkbox" v-model="terms" id="terms" required>
        <label for="terms">I accept the terms and conditions</label>
    </div>

    <label for="skills">Skills</label>
    <input type="skills" id="skills" v-model="tempSkill" @keyup="addSkill">
    <div v-for="skill in skills" class="pill">
        <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>

    <div class="submit">
        <button>Create an account</button>
    </div>


  </form>

  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Role: {{ role }}</p>
  <p>Terms accepted: {{ terms }}</p>
</template>

<script>
export default {
  name: 'SignupForm',
  components: {
  },
    data() {
        return {
            email: 'mario@bros.com',
            password: '',
            role: 'developer',
            terms: false,
            tempSkill: '',
            skills: [],
            passwordError: '',
        }
    },
    methods: {
        addSkill(e) {
            if (this.tempSkill.length > 2) {
                if (e.key === ',') {
                    if (!this.skills.includes(this.tempSkill.slice(0, -1))) {
                        this.skills.push(this.tempSkill.slice(0, -1));
                    }
                    this.tempSkill = '';
                }
            }
        },
        deleteSkill(skill) {
            this.skills = this.skills.filter(s => s !== skill);
        },
        handleSubmit (e) {
            // validate password
            this.passwordError = this.password.length < 2 ? 'Password must be at least 2 characters' : '';

            if (this.passwordError === '') {
                console.log('Form submitted');
            }
        }
    },
}

</script>

<style>
form {
  margin: 30px auto;
  width: 300px;
  padding: 1em;
  border: 1px solid #CCC;
  border-radius: 1em;
  background-color: #f5f5f5;
  max-width: calc(100% - 40px);
  text-align: left;
}
label {
  display: inline-block;
  /* width: calc(100%); */
  text-align: left;
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}
input, select {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
    top: 2px;
}
.terms {
    margin: 3px 0;
}
.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 5px 10px;
    background-color: #ddd;
    border-radius: 20px;
    letter-spacing: 1px;
    font-size: 0.8em;
    color: #555;
    cursor: pointer;
}
button {
    display: block;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 20px;
    background-color: #555;
    color: #fff;
    font-size: 0.8em;
    letter-spacing: 1px;
    cursor: pointer;
}
.submit {
    text-align: center;
}
.error {
    color: red;
    font-size: 0.8em;
    margin-top: 10px;
}
</style>
