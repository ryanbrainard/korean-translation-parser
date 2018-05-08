import './App.css';
import React, {Component} from 'react';
import {KoreanParser} from './KoreanParser'

class ParserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: '',
      parsed: {},
    }
    this.handleSourceChange = this.handleSourceChange.bind(this)
  }


  handleSourceChange(event) {
    this.setState({
      source: event.target.value,
      parsed: KoreanParser.parse(event.target.value),
    });
  }

  render() {
    const { source, parsed } = this.state

    return (
      <form>
        <h2>Input</h2>
        <textarea
          cols={100}
          rows={10}
          value={source}
          onChange={this.handleSourceChange}
        />

        <p/>

        <h2>Output</h2>

        <h3>Web</h3>
        <p><strong>{parsed.source}</strong></p>
        <ul className="ParserForm-phrases">
        {
          parsed.phrases &&
          parsed.phrases.map((p) =>
            <li title={p.translation}>
              {p.transcription}
              </li>
          )
        }
        </ul>
        <p><em>{parsed.translation}</em></p>

        <h3>Raw</h3>
        <pre>
          {JSON.stringify(parsed, null, '  ')}
        </pre>
      </form>
    );
  }
}

export default ParserForm;
