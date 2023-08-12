import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Modal,
} from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    lastPage: true,
    isLoading: false,
    src: null,
    alt: null,
    showModal: false,
  };
  getNormalayzedImages = array =>
    array.map(({ id, avg_color, alt, src }) => ({ id, avg_color, alt, src }));
  handleModalClose = () => this.setState({ showModal: false });
  async componentDidUpdate(prevProp, prevState) {
    if (
      (prevState.query === this.state.query &&
        prevState.page === this.state.page) ||
      this.state.query.trim() === ''
    ) {
      return;
    }
    // bbbb
    this.setState({ isLoading: true });
    try {
      const { photos, total_results } = await ImageService.getImages({
        page: this.state.page,
        query: this.state.query,
      });
      this.setState(prev => ({
        photos: [...prev.photos, ...this.getNormalayzedImages(photos)],
        lastPage: this.state.page >= Math.ceil(total_results / 15),
      }));
    } catch (error) {
      console.log('Error!!');
    } finally {
      this.setState({ isLoading: false });
    }
  }
  onSubmit = query => {
    this.setState({ query, page: 1, photos: [] });
  };
  handleClick = evt => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  handleImageClick = (src, alt) => {
    this.setState({ src, alt, showModal: true });
  };
  render() {
    const { photos, lastPage, isLoading, src, alt, showModal } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {isLoading && <p>Loading</p>}
        {photos.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {photos.length !== 0 && (
          <Grid>
            {photos.map(({ id, avg_color, alt, src }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img
                      onClick={() => this.handleImageClick(src.large, alt)}
                      src={src.medium}
                      alt={alt}
                    />
                  </CardItem>
                </GridItem>
              );
            })}
          </Grid>
        )}
        {!lastPage && <Button onClick={this.handleClick}>Load more</Button>}
        {showModal && (
          <Modal src={src} alt={alt} handleModalClose={this.handleModalClose} />
        )}
      </>
    );
  }
}
