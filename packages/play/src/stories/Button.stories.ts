import type {Meta, StoryObj, ArgTypes} from '@storybook/vue3'
import {fn, within, userEvent, expect, clearAllMocks} from '@storybook/test'
import {set} from 'lodash-es'
import {XmkButton, XmkButtonGroup} from 'xmk-ui'

type Story = StoryObj<typeof XmkButton> & {argTypes?: ArgTypes}

const meta: Meta<typeof XmkButton> = {
  title: 'Example/Button',
  component: XmkButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {type: 'select'},
      options: ['primary', 'success', 'warning', 'danger', 'info', '']
    },
    size: {
      control: {type: 'select'},
      options: ['large', 'default', 'small', '']
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    useThrottle: {
      control: 'boolean'
    },
    throttleDuration: {
      control: 'number'
    },
    autofocus: {
      control: 'boolean'
    },
    tag: {
      control: {type: 'select'},
      options: ['button', 'a', 'div']
    },
    nativeType: {
      control: {type: 'select'},
      options: ['button', 'submit', 'reset', '']
    },
    icon: {
      control: {type: 'text'}
    },
    loadingIcon: {
      control: {type: 'text'}
    }
  },
  args: {onClick: fn()}
}

const container = (val: string) => `
  <div style="margin:5px">
      ${val}
  </div>
`

export const Default: Story & {args: {content: string}} = {
  argTypes: {
    content: {
      control: {type: 'text'}
    }
  },
  args: {
    type: 'primary',
    content: 'Button'
  },
  render: args => ({
    components: {XmkButton},
    setup() {
      return {args}
    },
    template: container(`<xmk-button data-testid="story-test-btn" v-bind="args">{{args.content}}</xmk-button>`)
  }),

  play: async ({canvasElement, args, step}) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByTestId('story-test-btn')

    await step('when useThrottle is set to true,the onClick should be called once', async () => {
      set(args, 'useThrottle', true)
      await userEvent.tripleClick(btn)
      expect(args.onClick).toHaveBeenCalledTimes(1)
      clearAllMocks()
    })

    await step('when useTrhottle is set to false,the onClick should be called three times', async () => {
      set(args, 'useThrottle', false)
      await userEvent.tripleClick(btn)
      expect(args.onClick).toHaveBeenCalledTimes(3)
      clearAllMocks()
    })

    await step('when disabled is set to true, the onClick should not be called', async () => {
      set(args, 'disabled', true)
      await userEvent.click(btn)

      expect(args.onClick).not.toHaveBeenCalled()
      set(args, 'disabled', false)
      clearAllMocks()
    })

    await step('when loading is set to true, the button should be disabled', async () => {
      set(args, 'loading', true)
      await userEvent.click(btn)

      expect(args.onClick).toHaveBeenCalledTimes(0)
      set(args, 'loading', false)
      clearAllMocks()
    })
  }
}

export const Autofocus: Story & {args: {content: string}} = {
  argTypes: {
    content: {
      contrl: {type: 'text'}
    }
  },
  args: {
    content: 'Button',
    autofocus: true
  },
  render: args => ({
    components: {XmkButton},
    setup() {
      return {args}
    },
    template: container(`
        <p>请点击浏览器的刷新页面来使按钮自动聚焦</p>
        <xmk-button data-testid="story-test-btn" v-bind="args">{{args.content}}</xmk-button>
      `)
  }),
  play: async ({args}) => {
    await userEvent.keyboard('{enter}')
    expect(args.onClick).toHaveBeenCalled()
    clearAllMocks()
  }
}

export const Group: Story & {args: {content1: string; content2: string}} = {
  argTypes: {
    groupType: {
      control: {type: 'select'},
      options: ['primary', 'success', 'warning', 'danger', 'info', '']
    },
    groupSize: {
      control: {type: 'select'},
      options: ['large', 'default', 'small', '']
    },
    groupDisabled: {
      control: 'boolean'
    },
    content1: {
      control: {type: 'text'},
      defaultValue: 'Button1'
    },
    content2: {
      control: {type: 'text'},
      defaultValue: 'Button2'
    }
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2'
  },
  render: args => ({
    components: {XmkButton, XmkButtonGroup},
    setup() {
      return {args}
    },
    template: container(`
      <xmk-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
      <xmk-button v-bind="args">{{args.content1}}</xmk-button>
        <xmk-button v-bind="args">{{args.content2}}</xmk-button>
      </xmk-button-group>
    `)
  }),
  play: async ({canvasElement, args, step}) => {
    const canvas = within(canvasElement)
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'))
    })
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'))
    })
    expect(args.onClick).toHaveBeenCalled()
  }
}

export default meta
