import "../../asserts/styles/footer.styl"

export default {
  data() {
    return ({
      author: 'sy'
    })
  },
  render() {
    return (
      <div id="footer"><span>write for study by {this.author}</span></div>
    )
  }
}