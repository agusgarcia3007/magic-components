import { useState } from "react"
import { Select } from "./components/Select/Select"
import { Option } from "./components/Select/types"
import styles from "./components/Select/Select.module.css"

const options = [
  { value: "1", label: "Javascript" },
  { value: "2", label: "Typescript" },
  { value: "3", label: "Css" },
  { value: "4", label: "ReactJS" },
  { value: "5", label: "Vite" },
]

const App = () => {
  const [value, setValue] = useState<Option[]>([options[0]])
  const [value2, setValue2] = useState<Option | undefined>(options[0])

  return (
    <>
      <div className={styles.center}>
        <h1 className={styles.title}>Magic Components</h1>
        <Select
          options={options}
          value={value2}
          onChange={(opt) => setValue2(opt)}
        />
        <br />
        <Select
          multiple
          options={options}
          value={value}
          onChange={(opt) => setValue(opt)}
        />
      </div>
    </>
  )
}

export default App
