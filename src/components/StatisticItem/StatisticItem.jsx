import {
  StatisticBox,
  StatisticText,
  StatisticCounter,
} from './StatisticItem.styled';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export const StatisticItem = ({ total, title, icon }) => {
  return (
    <StatisticBox>
      <IconContext.Provider value={{ size: '2em' }}>
        {icon}
      </IconContext.Provider>
      <StatisticCounter>{total}</StatisticCounter>
      <StatisticText>{title}</StatisticText>
    </StatisticBox>
  );
};

StatisticItem.propTypes = {
  total: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
