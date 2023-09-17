# RealTime Chat API

**RealTime Chat API** is a real-time chat application developed using Express.js, Node.js, and MongoDB. This comprehensive solution seamlessly integrates various features, including secure user authentication, private conversations, dynamic group messaging, threaded messaging, advanced search capabilities, profile management, session control, and robust error handling. The API is secured with different endpoints, covering all aspects of the project.

## Usage

### Authentication

- Register: `/api/auth/register` (POST)
- Login: `/api/auth/login` (POST)
- Logout: `/api/auth/logout` (POST)

### Private Conversations

- List Conversations: `/api/message/private` (GET)
- Create Conversation: `/api/message/private` (POST)
- List Messages of particular Conversation: `/api/message/private/:id` (GET)
- Post Message to particular Conversation: `/api/message/private/:id` (POST)

### Group Messaging

- List Groups: `/api/message/group` (GET)
- Create Group: `/api/message/group` (POST)
- List Group Messages of particular Group: `/api/message/group/:id` (GET)
- Post Group Message to particular Group: `/api/message/group/:id` (POST)
- Add user to Group: `/api/message/group//adduser/:id` (POST)
  
### Message Threading

- Reply to Message in group: `/api/message/group/:id` (POST)
- Reply to Message in private conversation: `/api/message/private/:id` (POST)

### Advanced Search

- Search Messages from group: `/api/message/group/:id/message/:message` (GET)
- Search Group: `/api/message/group/search/:group` (GET)
- Search Messages from private conversation: `/api/message/private/:id/message/:message` (GET)

### Profile Management

- Update User Profile: `/api/user` (PUT)
