class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    User.all.push(this);
  }

  static renderUserForm(){
    let tag_bar = document.getElementById('form-thing')
    let form = document.createElement('form')
    let input = document.createElement('input')
    let submit = document.createElement('input')
    form.id = "user-session"
    form.class = "form"
    form.addEventListener("submit", (e)=>{
      User.findUser(e, input)
    })
    input.type = "text"
    input.id = "username"
    input.placeholder = "Input Username"
    input.name = "username"
    submit.type = "submit"
    submit.value = 'Login'
    form.append(input, submit)
    tag_bar.append(form)
  }

  static findUser(e, input){
    e.preventDefault()
    let foundUser = User.all.find(user => user.username === input.value)
    User.getUserSession(foundUser)
  }

 static getUserSession(foundUser){
  sessionStorage.setItem("user_id", `${foundUser.id}`)
  console.log(sessionStorage.getItem(`user_id`))

  }



}
User.all = [];
