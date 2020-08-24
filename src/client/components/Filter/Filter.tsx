import React, { useCallback, useState, useEffect } from 'react';
import useIsMounting from 'hooks/isMounting';
import IconTags from 'icons/tags.svg';
import { useHistory } from 'react-router-dom';
import { FilterProps } from './Filter.types';

/**
 * Filter Component
 */
const Filter: React.FC<FilterProps> = ({ categories, tags, type }) => {
  const history = useHistory();
  const isMounting = useIsMounting();

  // React state mutator for setting the toggleTags Boolean
  const [isTagsToggled, setIsTagsToggled] = useState(false);

  // React state mutator for setting the catButtons Object
  const [catButtons, setCatButtons] = useState({});

  // React state mutator for setting the tagButtons Object
  const [tagButtons, setTagButtons] = useState({});

  const toggleTags = useCallback(() => {
    setIsTagsToggled(!isTagsToggled);
  }, [isTagsToggled]);

  const toggleCategory = useCallback(
    (e, slug) => {
      e.preventDefault();
      const tempCatButtons = {
        ...catButtons,
        [slug]: !catButtons[slug],
      };

      const checkFalse = Object.keys(tempCatButtons).every(
        (key) => !tempCatButtons[key]
      );

      if (checkFalse || slug === 'all') {
        setCatButtons({});
      } else {
        setCatButtons(tempCatButtons);
      }
    },
    [catButtons]
  );

  const toggleTag = useCallback(
    (e, slug) => {
      e.preventDefault();

      const tempTagButtons = {
        ...tagButtons,
        [slug]: !tagButtons[slug],
      };

      const checkFalse = Object.keys(tempTagButtons).every(
        (key) => !tempTagButtons[key]
      );

      if (checkFalse || slug === 'all') {
        setTagButtons({});
      } else {
        setTagButtons(tempTagButtons);
      }
    },
    [tagButtons]
  );

  useEffect(() => {
    if (isMounting && history.location.search) {
      const getSearchParams = new URLSearchParams(history.location.search);
      const catSearchParams = getSearchParams.has('cat')
        ? getSearchParams.get('cat').split(',')
        : null;
      const tagSearchParams = getSearchParams.has('tag')
        ? getSearchParams.get('tag').split(',')
        : null;

      // Get the cat params and convert to an object
      if (catSearchParams && catSearchParams[0] !== 'all') {
        let getCatObj = {};
        catSearchParams.forEach((cat) => {
          getCatObj = {
            ...getCatObj,
            [cat]: true,
          };
        });
        setCatButtons(getCatObj);
      }

      // Get the cat params and convert to an object
      if (tagSearchParams && tagSearchParams[0] !== 'all') {
        let getTagObj = {};
        tagSearchParams.forEach((tag) => {
          getTagObj = {
            ...getTagObj,
            [tag]: true,
          };
        });
        setTagButtons(getTagObj);
      }
    }
  }, [history.location.search, isMounting]);

  useEffect(() => {
    if (!isMounting) {
      // Category Buttons
      const trueCatButtons = {};
      Object.keys(catButtons).forEach((cat) => {
        if (catButtons[cat]) {
          trueCatButtons[cat] = catButtons[cat];
        }
      });
      const trueCatButtonsArr = Object.keys(trueCatButtons);
      const catQueryString =
        trueCatButtonsArr.length > 0
          ? `cat=${trueCatButtonsArr.join(',')}`
          : 'cat=all';

      // Tag Buttons
      const trueTagButtons = {};
      Object.keys(tagButtons).forEach((tag) => {
        if (tagButtons[tag]) {
          trueTagButtons[tag] = tagButtons[tag];
        }
      });
      const trueTagButtonsArr = Object.keys(trueTagButtons);
      const tagQueryString =
        trueTagButtonsArr.length > 0
          ? `tag=${trueTagButtonsArr.join(',')}`
          : 'tag=all';

      // Define the query string
      const queryString = `${
        catQueryString || tagQueryString ? '?' : ''
      }${catQueryString}${
        catQueryString && tagQueryString ? '&' : ''
      }${tagQueryString}`;

      // Update the URL to trigger the fetch data action
      history.push(`/${type}/${queryString}`);
    }
  }, [catButtons, history, isMounting, tagButtons, type]);

  return (
    <div className={`Filter${isTagsToggled ? ' Filter Filter--toggled' : ''}`}>
      <h2 className="visuallyHidden">Filter Options</h2>
      <button
        type="button"
        onClick={() => toggleTags()}
        id="tag-toggle"
        className="Filter__tagToggle"
        title="Toggle Tag List"
      >
        <span className="visuallyHidden">Toggle Tag List</span>
        <IconTags />
      </button>
      <div className="Filter__lists">
        {categories && (
          <ul className="Filter__list Filter__list--categories">
            <li
              className={`Filter__listItem${
                Object.keys(catButtons)?.length <= 0
                  ? ' Filter__listItem--selected'
                  : ''
              }`}
            >
              <a
                href={`/${type}`}
                className="Filter__listItemLink"
                onClick={(e) => toggleCategory(e, 'all')}
              >
                All
              </a>
            </li>
            {categories.length > 0 &&
              categories.map((category) => (
                <li
                  className={`Filter__listItem${
                    catButtons[category.slug]
                      ? ' Filter__listItem--selected'
                      : ''
                  }`}
                  id={`cat-${category.slug}`}
                  key={category.term_id}
                >
                  <a
                    className="Filter__listItemLink"
                    href={`/${type}?cat=${category.slug}`}
                    onClick={(e) => toggleCategory(e, category.slug)}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
          </ul>
        )}
        {tags && (
          <ul className="Filter__list Filter__list--tags">
            <li
              className={`Filter__listItem${
                Object.keys(tagButtons)?.length <= 0
                  ? ' Filter__listItem--selected'
                  : ''
              }`}
            >
              <a
                href={`/${type}`}
                className="Filter__listItemLink"
                onClick={(e) => toggleTag(e, 'all')}
              >
                All
              </a>
            </li>
            {tags.map((tag) => (
              <li
                className={`Filter__listItem${
                  tagButtons[tag.slug] ? ' Filter__listItem--selected' : ''
                }`}
                id={`tag-${tag.slug}`}
                key={tag.term_id}
              >
                <a
                  className="Filter__listItemLink"
                  href={`/${type}?tag=${tag.slug}`}
                  onClick={(e) => toggleTag(e, tag.slug)}
                >
                  {tag.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
