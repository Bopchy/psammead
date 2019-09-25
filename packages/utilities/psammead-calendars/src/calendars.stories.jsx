import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import { getJalaaliCalendar } from './calendars/jalaali';

const stories = storiesOf('Utilities|Psammead Moment Calendars', module);

const testMoment = moment('2019-01-01');
stories.add('Jalaali Persian', () => {
  testMoment.locale('fa');
  const momentDate = getJalaaliCalendar(testMoment);
  return <div>{momentDate}</div>;
});

stories.add('Jalaali Pashto', () => {
  testMoment.locale('ps');
  const momentDate = getJalaaliCalendar(testMoment);
  return <div>{momentDate}</div>;
});
