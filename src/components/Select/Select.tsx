import { useEffect, useRef, useState } from "react"
import styles from "./Select.module.css"
import { SelectProps, Option } from "./types"

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }

  const selectOption = (option: Option) => {
    multiple
      ? value?.includes(option)
        ? onChange(value.filter((o) => o !== option))
        : onChange([...value, option])
      : option !== value && onChange(option)
  }

  const isOptionSelected = (option: Option) => {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (open) setHighlightedIndex(0)
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return

      switch (e.code) {
        case "Enter":
        case "Space":
          setOpen((prev) => !prev)
          if (open) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!open) {
            setOpen(true)
            break
          }
          const newValue = highlightedIndex + (e.code === "ArrowUp" ? -1 : 1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setOpen(false)
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [open, highlightedIndex, options])

  return (
    <>
      <h3 className={styles.title}>
        {multiple ? "Select Mulitple options" : "Select a single option"}
      </h3>
      <div
        ref={containerRef}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((val) => (
                <button
                  key={val.value}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectOption(val)
                  }}
                  className={styles["option-badge"]}
                >
                  {val.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            clearOptions()
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={`${open ? styles["caret-up"] : styles.caret}`}></div>
        <ul className={`${styles.options} ${open ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles["option-selected"] : ""
              } ${
                index === highlightedIndex ? styles["option-highlighted"] : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
