// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract OpenUP {
    event PostCreated(
        bytes32 indexed postId,
        address indexed postOwner,
        bytes32 indexed parentId,
        bytes32 contentId,
        bytes32 categoryId
    );
    event ContentAdded(bytes32 indexed contentId, string contentUri);
    event CategoryCreated(bytes32 indexed categoryId, string category);
    event Voted(
        bytes32 indexed postId,
        address indexed postOwner,
        address indexed voter,
        uint80 reputationPostOwner,
        uint80 reputationVoter,
        int40 postVotes,
        bool up,
        uint8 reputationAmount
    );

    struct post {
        address postOwner;
        bytes32 parentPost;
        bytes32 contentId;
        int40 votes;
        bytes32 categoryId;
    }

    mapping(address => mapping(bytes32 => uint80)) reputationRegistry;
    mapping(bytes32 => string) categoryRegistry;
    mapping(bytes32 => string) contentRegistry;
    mapping(bytes32 => post) postRegistry;
    mapping(address => mapping(bytes32 => bool)) voteRegistry;

    function createPost(
        bytes32 _parentId,
        string calldata _contentUri,
        bytes32 _categoryId
    ) external {
        address _owner = msg.sender;
        // Keccak256 is a cryptographic function built into solidity. This function takes in any amount of inputs and converts it to a unique 32 byte hash.
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        bytes32 _postId = keccak256(
            abi.encodePacked(_owner, _parentId, _contentId)
        );
        contentRegistry[_contentId] = _contentUri;
        postRegistry[_postId].postOwner = _owner;
        postRegistry[_postId].parentPost = _parentId;
        postRegistry[_postId].contentId = _contentId;
        postRegistry[_postId].categoryId = _categoryId;
        emit ContentAdded(_contentId, _contentUri);
        emit PostCreated(_postId, _owner, _parentId, _contentId, _categoryId);
    }
    function voteUp(bytes32 _postId, uint8 _reputationAdded) external {
        address _voter = msg.sender;
        bytes32 _category = postRegistry[_postId].categoryId;
        address _contributor = postRegistry[_postId].postOwner;
        require (postRegistry[_postId].postOwner != _voter, "you cannot vote your own posts");
        require (voteRegistry[_voter][_postId] == false, "Sender already voted in this post");
        require (validateReputationChange(_voter,_category,_reputationAdded)==true, "This address cannot add this amount of reputation points");
        postRegistry[_postId].votes += 1;
        reputationRegistry[_contributor][_category] += _reputationAdded;
        voteRegistry[_voter][_postId] = true;
        emit Voted(_postId, _contributor, _voter, reputationRegistry[_contributor][_category], reputationRegistry[_voter][_category], postRegistry[_postId].votes, true, _reputationAdded);
    }

    function voteDown(bytes32 _postId, uint8 _reputationTaken) external {
        address _voter = msg.sender;
        bytes32 _category = postRegistry[_postId].categoryId;
        address _contributor = postRegistry[_postId].postOwner;
        require (voteRegistry[_voter][_postId] == false, "Sender already voted in this post");
        require (validateReputationChange(_voter,_category,_reputationTaken)==true, "This address cannot take this amount of reputation points");
        postRegistry[_postId].votes >= 1 ? postRegistry[_postId].votes -= 1: postRegistry[_postId].votes = 0;
        reputationRegistry[_contributor][_category] >= _reputationTaken ? reputationRegistry[_contributor][_category] -= _reputationTaken: reputationRegistry[_contributor][_category] =0;
        voteRegistry[_voter][_postId] = true;
        emit Voted(_postId, _contributor, _voter, reputationRegistry[_contributor][_category], reputationRegistry[_voter][_category], postRegistry[_postId].votes, false, _reputationTaken);
    }
}
// 0x3d9083858A82aEB66e084b969F8EbA7C2b6c0AA4
