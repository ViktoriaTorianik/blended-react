import { BiDollarCircle } from 'react-icons/bi';
import { FcBullish, FcBearish } from 'react-icons/fc';
import { ForbesItem, Avatar, Name, Capital } from './ForbesListItem.styled';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

import { theme } from 'styles/theme';

export const ForbesListItem = ({ name, capital, avatar, isIncrease }) => {
  return (
    <ForbesItem>
      <Avatar src={avatar} alt={name} />
      <Name>{name}</Name>
      <Capital>
        {capital} <BiDollarCircle color={theme.colors.accent} size={22} />
        <IconContext.Provider value={{ size: '2em' }}>
          {isIncrease ? <FcBullish /> : <FcBearish />}
        </IconContext.Provider>
      </Capital>
    </ForbesItem>
  );
};
ForbesListItem.propTypes = {
  name: PropTypes.string.isRequired,
  capital: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
};
