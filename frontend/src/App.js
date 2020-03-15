import React from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalTimeline from "./HorizontalTimeline";

const testEvents = [
    {time: "1945", content: "Content piece number one"},
    {time: "1947", content: "Content piece number two"},
    {time: "1950", content: "Content piece number three"},
    {time: "1955", content: "Content piece number four"},
    {time: "1960", content: "Content piece number five"},
    {time: "1945", content: "Content piece number one"},
    {time: "1947", content: "Content piece number two"},
    {time: "1950", content: "Content piece number three"},
    {time: "1955", content: "Content piece number four"},
    {time: "1945", content: "Content piece number one"},
    {time: "1947", content: "Content piece number two"},
    {time: "1950", content: "Content piece number three"},
    {time: "1955", content: "Content piece number four"},
    {time: "1960", content: "Content piece number five"},
    {time: "1945", content: "Content piece number one"},
    {time: "1947", content: "Content piece number two"},
    {time: "1950", content: "Content piece number three"},
    {time: "1955", content: "Content piece number four"},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
            Horizontal Timeline ->
        </p>
      </header>
      <HorizontalTimeline items={testEvents}/>
    </div>
  );
}

export default App;
