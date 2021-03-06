import { mount } from '@vue/test-utils'
import index from './index.vue'

/* #region  Test setup */
const toast = jest.fn()
const setErrors = jest.fn()
const login = jest
  .fn()
  .mockRejectedValue({ response: { data: { errors: [] } } })

const ValidationObserver = {
  render(h) {},
  methods: { setErrors },
}

const factory = () => {
  return mount(index, {
    mocks: { $auth: { login }, $bvToast: { toast } },
    components: { ValidationObserver },
  })
}
/* #endregion */

describe('index.vue', () => {
  let wrapper
  beforeEach(() => (wrapper = factory()))

  test('should mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('should called submit correctly', async () => {
    wrapper.vm.submit()
    expect(login).toHaveBeenCalledWith({
      data: { user: { email: '', password: '' } },
    })

    await wrapper.vm.$nextTick()

    expect(toast).toHaveBeenCalledWith('User name and/or Password is invalid', {
      title: 'Login Failed!',
      variant: 'danger',
      solid: true,
    })
  })
})
