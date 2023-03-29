const useVerifyPassword = () => {

  const verify = password => {
    const check = regex => regex.test(password)

    return [
      {
        condition: '8 characters',
        isValid: password.length >= 8
      }, {
        condition: '1 uppercase character',
        isValid: check(/[A-Z]/)
      }, {
        condition: '1 lowercase character',
        isValid: check(/[a-z]/)
      }, {
        condition: '1 number',
        isValid: check(/\d/)
      }, {
        condition: '1 special character',
        isValid: check(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/)
      }
    ]
  }

  return { verify }
}

export default useVerifyPassword