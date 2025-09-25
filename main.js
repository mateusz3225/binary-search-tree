class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}
function ArrayInOrder(array) {
       return [...new Set(array)].sort((a, b) => a - b);

}   

function buildTree(array,start = 0, end = array.length-1) {
    if(start>end) {return null};
 let mid = start + Math.floor((end-start)/2);
 let root = new Node(array[mid]);
 root.left = buildTree(array,start, mid-1);
 root.right = buildTree(array, mid+1,end);
 return root;
}

function insertToTree(root, data) {
    if (root === null) {
        return new Node(data);
    }
    if (root.data === data) {
        return root;
    }
    if (data < root.data) {
        root.left = insertToTree(root.left, data);
    } else if (data > root.data) {
        root.right = insertToTree(root.right, data);
    }
    return root;
}
function getSuccessor(curr) {
    curr = curr.right;
    while(curr !==null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
}
function deleteFromTree(root,value) {
    if (root === null) {
        return root;
    }
    if (root.data > value) {
        root.left= deleteFromTree(root.left,value);
    } else if (root.data< value) {
        root.right = deleteFromTree(root.right,value)
    } else {
        //if it matched
        if (root.left === null)
            return root.right;
    
        if(root.right === null) {
            return root.left;
        }
        //When botch children are present
        let succ = getSuccessor(root);
        root.data = succ.data;
        root.right = deleteFromTree(root.right, succ.data);
    }
    return root;
}
function find(root,value) {
      if (root === null) {
        return null; 
    }
    if (root.data === value) {
       
        return root;
    }
    if (root.data > value) {
        
        return find(root.left, value);
    } else if (root.data<value) {
        
        return find(root.right, value);
    } return root;
    
}
   
function levelOrderForEach(root,callback, array = [root]) {
    //if (!callback) {
    //    throw new Error("Provide a callback function");
    //}
    while (array.length > 0) {

       callback(array[0]);
    if (array[0].left){
    array.push(array[0].left);
    } 
    if (array[0].right) {
    array.push(array[0].right);
    }
    array.shift();
}}
function PreOrderForEach(root,callback) {
    if (root == null) return;
    inOrderForEach(root.left,callback);
    callback(root);
    inOrderForEach(root.right,callback);
}
function inOrderForEach(root,callback) {
  if (root == null) return;
    callback(root);
    inOrderForEach(root.left,callback);
    inOrderForEach(root.right,callback);
}
function postOrderForEach(root,callback) {
      
    inOrderForEach(root.left,callback);
    inOrderForEach(root.right,callback);
    callback(root);
}


function depth(root,value,depthof=0) {
    depthof++;
          if (root === null) {
        return null; 
    }
    if (root.data === value) {
       
        return depthof;
    }
    if (root.data > value) {
        
        return depth(root.left, value,depthof);
    } else if (root.data<value) {
        
        return depth(root.right, value,depthof);
    } return depthof;
    
}
function height(root,value, heightOf) {
    root = find(root, value);
    function heightHelper(root,value,heightOf = -1) {
    heightOf++; 
          if (root === null) {
            
        return heightOf; 
    }
        const leftHi= heightHelper(root.left, value,heightOf);
        const rightHi = heightHelper(root.left, value,heightOf);
        return Math.max(leftHi,rightHi);
   
}
    return heightHelper(root,value,heightOf);
}
function isBalanced(root) {
    if (root === null) return true;

    
    function getHeight(node) {
        if (node === null) return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);

    const isCurrentNodeBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    return isCurrentNodeBalanced &&
           isBalanced(root.left) &&
           isBalanced(root.right);
}
function rebalance(root, array = []) {
    inOrderForEach(root,(item) => {array.push(item.data)});
    array = ArrayInOrder(array);
    return new Tree(array);
    
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
function random100array() {
    arrayWithRandom = [];
    for(i=0;i<=99;i++) {
        arrayWithRandom.push(Math.floor(Math.random()*100,2))
    }
   return arrayWithRandom;
}
const sortedArray = ArrayInOrder(random100array());
let tree = new Tree(sortedArray);
console.log(prettyPrint(tree.root));
console.log(isBalanced(tree.root));
tree.root = insertToTree(tree.root,9998898);
tree.root = insertToTree(tree.root,9989678968999999);
tree.root = insertToTree(tree.root,99997857864999);
tree.root = insertToTree(tree.root,9999674675999);
tree.root = insertToTree(tree.root,9995635639999);
tree.root = insertToTree(tree.root,6556);
tree.root = insertToTree(tree.root,8976);
tree.root = insertToTree(tree.root,743);
console.log(isBalanced(tree.root));
tree = rebalance(tree.root);
console.log(isBalanced(tree.root));
PreOrderForEach(tree.root, (element) => {
    //console.log(element);
});
postOrderForEach(tree.root, (element) => {
    //console.log(element);
});
inOrderForEach(tree.root, (element) => {
    //console.log(element);
});