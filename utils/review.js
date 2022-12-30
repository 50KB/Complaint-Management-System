import axios from 'axios';
import baseUrl from './baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';

export const closeComplain = async (user, comment, complainID, setStatuses) => {
  try {
    const token = cookie.get('token');

    const res = await axios.patch(
      `${baseUrl}/api/v1/review/closeComplain/${complainID}`,
      { user, comment },
      { headers: { Authorization: token } }
    );

    Router.reload();
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const changeReviewer = async (user, complainID) => {
  try {
    const token = cookie.get('token');

    const res = await axios.patch(
      `${baseUrl}/api/v1/review/reviewerChange/${complainID}`,
      { user },
      { headers: { Authorization: token } }
    );

    Router.reload();
  } catch (error) {
    alert(catchErrors(error));
  }
};
