import './styles.scss'

import { memo } from 'react'

import Icon from '../Icon'

const PasswordVerifier = ({ password }) => {
  const testRegex = regex => regex.test(password)

  const tests = [{
    condition: '8 characters',
    action: () => password.length >= 8
  }, {
    condition: '1 uppercase character',
    action: () => testRegex(/[A-Z]/)
  }, {
    condition: '1 lowercase character',
    action: () => testRegex(/[a-z]/)
  }, {
    condition: '1 number',
    action: () => testRegex(/\d/)
  }, {
    condition: '1 special character',
    action: () => testRegex(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/)
  }]

  return (
    <div className="tips validation">
      <p>Password must contain :</p>
      <ul>
        {tests.map(({ condition, action }, i) => (
          <li key={i}>
            <Icon
              icon={action() ? 'CheckBadgeIcon' : 'XMarkIcon'}
              attr={{
                stroke: !action() && '#ff3e00',
                strokeWidth: !action() && 2.5
              }}
            />
            <p>At least {condition}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(PasswordVerifier)