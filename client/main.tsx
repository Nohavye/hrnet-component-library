import React from 'react'
import ReactDOM from 'react-dom/client'
import { Viewer } from './utils'
import './index.css'

import { TargetComponent } from '../dev'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Viewer>
            <TargetComponent />
        </Viewer>
    </React.StrictMode>
)
