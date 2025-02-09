const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function newNode(input) {
  return {
    data: input,
    left: null,
    right: null
  };
};

function Tree(arr) {
  let sortedArr = [];
  for (let item of arr) {
      if (!sortedArr.includes(item)) {
          sortedArr.push(item);
      };
  };
  sortedArr.sort((a,b) => a-b);
  let root = buildTree(sortedArr, 0, sortedArr.length-1);
  return root;
};

function buildTree(arr, start, end) {
  if (start > end) return null;
  let mid = start + Math.floor((end-start)/2);

  let root = newNode(arr[mid]);
  root.left = buildTree(arr, start, mid-1);
  root.right = buildTree(arr, mid+1, end);

  return root;  
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(root, key) {
  if (root === null) {
    return newNode(key);
  };
  if (root.data === key) {
    return root;
  };    
  if (key < root.data) {
    root.left = insert(root.left, key);
  } else if (key > root.data) {
    root.right = insert(root.right, key);
  };        
  return root;
};

function deleteItem(root, key) {
  function getSuccessor(current) {
    current = current.right;
    while (current.left !== null) {
      current = current.left;
    };
    return current;
  };
  // base case
  if (root === null) {
    return root;
  };
  // if key is in a subtree
  if (key < root.data) {
    root.left = deleteItem(root.left, key);
  } else if (key > root.data) {
    root.right = deleteItem(root.right, key);
  } else {
  // If root matches the key    
  // && root has 0 children or only right child
    if (root.left === null) {
      return root.right;
    };
  // && root has only left child
    if (root.right === null) {
      return root.left;
    };
  // && root has two children
    let succ = getSuccessor(root);
    root.data = succ.data;
    root.right = deleteItem(root.right, succ.data);
  };  
  return root;
};

function find(root, value) {
  if (root === null) {
    return root;
  };
  if (value < root.data) {
    return find(root.left, value);
  } else if (value > root.data) {
    return find(root.right, value);
  } else {
    return root;
  };
};

function printValue(root) {
  console.log(root.data);
};

function levelOrder(root, callback) {
  if (!callback) throw new Error('A callback is required!');
  if (!root) return [];
  let que = [];
  que.push(root);

  while (que.length) {
    let result = [];

    while (que.length) {
      let node = que.shift();
      result.push(node);
      if (node.left) {
        que.push(node.left)
      };
      if (node.right) {
        que.push(node.right)};
    };

    while (result.length) {
      callback(result.shift());
    };   
  };
};

function preOrder(root, callback) {
  if (!callback) throw new Error('A callback is required!');
  if (!root) return [];
  callback(root);
  if (root.left) {
    preOrder(root.left, callback);
  };
  if (root.right) {
    preOrder(root.right, callback);
  };
};

function inOrder(root, callback) {
  if (!callback) throw new Error('A callback is required!');
  if (!root) return [];  
  if (root.left) {
    inOrder(root.left, callback);
  };
  callback(root);
  if (root.right) {
    inOrder(root.right, callback);
  };
};

function postOrder(root, callback) {
  if (!callback) throw new Error('A callback is required!');
  if (!root) return [];  
  if (root.left) {
    postOrder(root.left, callback);
  };  
  if (root.right) {
    postOrder(root.right, callback);
  };
  callback(root);
};

function height(node) {
  if (!node) return 0;
  let que = [node];
  let depth = 0;
  while (que.length) {
    for (let i=0; i<que.length; i++) {
      let current = que.shift();
      if (current.left) {
        que.push(current.left);
      };
      if (current.right) {
        que.push(current.right);
      };
    };    
    depth++;
  };
  return depth-1;
};

function depth(root, x) {
  if (!root) return -1;

  let size = -1;

  if ((root.data === x)
    || ((size = depth(root.left, x)) >= 0)
    || ((size = depth(root.right, x)) >= 0)) {
    return size+1;
   };
  return size;
};

let root = Tree(sample);
insert(root, 222);
insert(root, 333);
prettyPrint(root);

console.log(depth(root, 4));