const animation = {
  emailInput: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .2
      }
    }
  },
  passwordInput: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .1
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .1
      }
    }
  },
  submitButton: {
    initial: {
      x: -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .2
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
}

export default animation