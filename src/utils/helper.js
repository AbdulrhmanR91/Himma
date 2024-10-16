export const validateEmail=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name)=>{

    if(!name) return ""
    // if the user is not logged in
   const words = name.split(" ")
   let initials=""

   for(let i=0;i<Math.min(words.length,2);i++) {
    initials+=words[i][0]
    // let str="sdasdsad"
    // console.log(str[0])
    // shows first letter
   }
   return initials.toUpperCase()
}