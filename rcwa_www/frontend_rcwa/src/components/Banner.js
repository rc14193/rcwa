import "../App.css"
import {GithubFilled} from '@ant-design/icons'

export default function Banner() {
    return (
      <header>
        <div className="banner">
          <div>
            Rigorous Coupled Wave Analysis (RCWA) 
          </div>
          <div>
            <a className="gitLink" href="https://github.com/edmundsj/rcwa"><GithubFilled /></a>
          </div>
        </div>
      </header>
    )
}