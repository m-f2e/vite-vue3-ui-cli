import { defineComponent } from 'vue'

export default defineComponent({
  name: 'loading',
  setup() {
    return () => {
      return <div style={{ color: 'red' }}>loading</div>
    }
  }
})