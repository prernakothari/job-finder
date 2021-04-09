import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from '../components/TopBar';
import JobTile from '../components/JobTile';
import { TimeAgo } from '../helpers/Utils';
import testData from './testData';

test('renders learn react link', () => {
  render(<Router>
    <TopBar />
  </Router>)
  const linkElement = screen.getByText("devjobs");
  expect(linkElement).toBeDefined()
});

test('test Time Ago method: T1', () => {
  let timeAgo = TimeAgo("Fri Apr 09 00:06:43 UTC 2021", 1617931686366)
  expect(timeAgo).toBe("1h ago")
})

test('test Time Ago method: T2', () => {
  let timeAgo = TimeAgo("Thu Apr 01 19:07:46 UTC 2021", 1617931686366)
  expect(timeAgo).toBe("7d ago")
})

it('JobTile renders correctly', () => {
  let item = testData()[0]
  const tree = renderer
    .create(<JobTile themeType={'light'} {...item} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('TopBar renders correctly', () => {
  let item = testData()[0]
  const tree = renderer
    .create(<Router> <TopBar /> </Router>).toJSON();
  expect(tree).toMatchSnapshot();
});