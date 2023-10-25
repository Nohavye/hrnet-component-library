import './index.css'
import reactLogo from '../assets/react.svg'
import jsonPackage from '../../package.json'

type Props = {
    children: React.ReactNode
}

export function Viewer({ children }: Props) {
    const libraryName = jsonPackage.name

    return (
        <>
            <div className="header">
                <div className="title">
                    <img
                        src={reactLogo}
                        className="react-logo"
                        alt="React logo"
                    />
                    <h1>{libraryName}</h1>
                </div>
                <div className="help">
                    <p>
                        To choose the component to develop, edit the{' '}
                        <code>dev/target/index.tsx</code> file.
                    </p>
                    <p>
                        Define your mocked data and props components in the{' '}
                        <code>dev/mock/index.ts</code> file.
                    </p>
                    <p>
                        Edit or create component to the{' '}
                        <code>lib/components</code> folder and save to test HMR.
                    </p>
                </div>
            </div>
            <div className="viewer">{children}</div>
        </>
    )
}
