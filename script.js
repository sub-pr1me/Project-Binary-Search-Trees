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

let root = Tree(sample);
insert(root, 888);
insert(root, 6666);
prettyPrint(root);

deleteItem(root, 324);
prettyPrint(root);

deleteItem(root, 6345);
prettyPrint(root);