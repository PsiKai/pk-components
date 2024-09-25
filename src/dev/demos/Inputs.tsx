import React from "react"
import { Input } from "../../lib/components/Input"
import { Button } from "../../lib/components/Button"

export const InputSection = () => {
  const [form, setForm] = React.useState({ firstName: "", lastName: "", middleName: "" })
  const [pending, setPending] = React.useState(false)
  const [touched, setTouched] = React.useState({
    firstName: false,
    lastName: false,
    middleName: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setTouched({ ...touched, [e.target.name]: true })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const name = `${form.firstName} ${form.middleName} ${form.lastName}`
    setForm({ firstName: "", lastName: "", middleName: "" })
    setTouched({ firstName: false, lastName: false, middleName: false })
    setPending(false)
    alert(`Hello, ${name}!`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <h3>Who are you?</h3>
      <Input
        label="First Name"
        id="firstName"
        name="firstName"
        hint="Just your first name"
        feedback="Required"
        clean={!!form.firstName}
        error={touched.firstName && !form.firstName && "This field is required."}
        onChange={handleChange}
        value={form.firstName}
        placeholder="John/Jane"
        disabled={pending}
      />
      <Input
        label="Middle Name"
        id="middleName"
        name="middleName"
        feedback="Optional"
        onChange={handleChange}
        value={form.middleName}
        placeholder="Middle"
        disabled={pending}
      />
      <Input
        label="Last Name"
        id="lastName"
        name="lastName"
        hint="Legal name"
        feedback="Required"
        clean={!!form.lastName}
        error={touched.lastName && !form.lastName}
        onChange={handleChange}
        value={form.lastName}
        placeholder="Doe"
        disabled={pending}
      />

      <Button
        type="submit"
        fit="block"
        pending={pending}
        disabled={!form.firstName || !form.lastName}
      >
        Submit Name
      </Button>
    </form>
  )
}
