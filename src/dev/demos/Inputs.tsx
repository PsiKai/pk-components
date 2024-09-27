import React from "react"
import { Input } from "../../lib/components/Input"
import { Button } from "../../lib/components/Button"

export const InputSection = () => {
  return (
    <>
      <div className="sub-section">
        <h3>Basic Text Input</h3>
        <Input id="basic-text-input" />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Label</h3>
        <Input label="Name" id="label-text-input" />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Hint Text</h3>
        <Input id="hint-text-input" label="Name" hint="Enter your name" />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Feedback Text</h3>
        <Input
          id="feedback-text-input"
          label="Name"
          hint="Enter your name"
          feedback="No special characters allowed."
        />
      </div>
      <hr />
      <div className="sub-section">
        <h3>Required</h3>
        <Input id="error-message-text-input" label="Name" feedback="Required" required />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Error Feedback</h3>
        <Input id="error-text-input" label="Name" error={true} required />
        <Input id="error-message-text-input" label="Name" error="Invalid name" required />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Success Feedback</h3>
        <Input id="clean-text-input" label="Name" clean />
        <Input id="clean-message-text-input" label="Name" clean="Name is valid" />
      </div>
      <hr />
      <div className="sub-section">
        <h3>With Placeholder</h3>
        <Input id="placeholder-text-input" label="Name" placeholder="John Doe" />
      </div>
      <hr />
      <div className="sub-section">
        <h3>Disabled</h3>
        <Input id="disabled-text-input" label="Name" disabled />
      </div>
      <hr />
      <div className="sub-section">
        <h3>Read Only</h3>
        <Input id="readonly-text-input" label="Name" value="John Doe" readOnly />
      </div>
      <hr />
      <InputForm />
    </>
  )
}

function InputForm() {
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
      <h3>With Form Feedback</h3>
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
        required
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
        required
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
