import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
  };
  async componentDidUpdate(prevProp, prevState) {
    if (
      prevState.query === this.state.query ||
      this.state.query.trim() === ''
    ) {
      return;
    }
    // bbbb
    const { photos, total_results } = await ImageService.getImages({
      page: this.state.page,
      query: this.state.query,
    });
    this.setState(prev => ({ photos: [...prev.photos, ...photos] }));
  }
  onSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
