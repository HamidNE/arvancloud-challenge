<template>
  <validation-provider
    v-slot="{ errors }"
    rules="required|min:8"
    name="Password"
  >
    <b-form-group label="Password" label-for="input-password">
      <b-form-input
        id="input-password"
        v-model="innerValue"
        type="password"
        :state="errors[0] ? false : null"
        required
      />
      <b-form-invalid-feedback v-text="errors[0]" />
    </b-form-group>
  </validation-provider>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
