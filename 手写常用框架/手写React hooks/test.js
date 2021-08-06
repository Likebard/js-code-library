// useState手写
let _state;
function _useState(initalState) {
    _state = _state || initalState;
    function setState(newState) {
        _state = newState;
        render();
    }
    return [_state, setState];
}

// useEffect手写
let _deps;
let clearLastCallBack;
function useEffect(callback, deps) {
    if (clearLastCallBack) clearLastCallBack();
    let hasNoDeps = !deps;
    let depsNotChange = deps ? deps.every((ele, i) => ele === _deps[i]) : false;

    if (!depsNotChange || hasNoDeps) {
        clearLastCallBack = callback();
        _deps = deps;
    }
}

// useState支持多次调用
let _stateArr = [];
let cursor = 0;

function useState(initalState) {
    _stateArr[cursor] = _stateArr[cursor] || initalState;
    let currentCursor = cursor;
    function setState(newState) {
        _stateArr[currentCursor] = newState;
        render();
    }

    return [_stateArr[cursor++], setState];
}

// 每次render后都触发useEffect
let firstRunArr;
let index = 0;
function _useEffect(fn, deps) {
    if(!firstRunArr[index]) { fn(); firstRunArr[index] = true };
    
    fn();
    
}

function Test() {
    const [count, setCount] = _useState(0);
    useEffect(() => {
        console.log("count is", count);
    }, [count]);
    return <div>
        <div>{count}</div>
        <button onClick={() => setCount(count+1)}></button>
    </div>
}